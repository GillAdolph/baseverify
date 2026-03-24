'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { base } from 'wagmi/chains';
import { baseVerifyAddress, baseVerifyABI } from '@/lib/contracts/baseVerify';
import { trackTransaction } from '@/utils/track';

export function VerifyCard() {
  const { address, isConnected, chain } = useAccount();
  const [verifyTime, setVerifyTime] = useState<string>('');

  const { data: isVerified, refetch: refetchVerified } = useReadContract({
    address: baseVerifyAddress,
    abi: baseVerifyABI,
    functionName: 'isVerified',
    args: address ? [address] : undefined,
    chainId: base.id,
  });

  const { data: verifiedAt, refetch: refetchTime } = useReadContract({
    address: baseVerifyAddress,
    abi: baseVerifyABI,
    functionName: 'getVerifiedTime',
    args: address ? [address] : undefined,
    chainId: base.id,
  });

  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (verifiedAt && Number(verifiedAt) > 0) {
      const date = new Date(Number(verifiedAt) * 1000);
      setVerifyTime(date.toLocaleString());
    }
  }, [verifiedAt]);

  useEffect(() => {
    if (isSuccess && hash) {
      refetchVerified();
      refetchTime();
      trackTransaction('app-00X', 'BaseVerify', address, hash);
    }
  }, [isSuccess, hash, address, refetchVerified, refetchTime]);

  if (!isConnected || !address) {
    return (
      <div className="text-center text-gray-500 p-4">
        Please connect your wallet
      </div>
    );
  }

  if (chain?.id !== base.id) {
    return (
      <div className="text-center text-red-500 p-4">
        Please switch to Base Mainnet
      </div>
    );
  }

  const handleVerify = () => {
    writeContract({
      address: baseVerifyAddress,
      abi: baseVerifyABI,
      functionName: 'verify',
      chainId: base.id,
    });
  };

  if (isVerified) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-2xl mb-2">✅</div>
        <div className="font-bold text-green-700 mb-2">Verified</div>
        {verifyTime && (
          <div className="text-sm text-green-600">
            Verified at: {verifyTime}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <button
        onClick={handleVerify}
        disabled={isPending || isConfirming}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition"
      >
        {isPending && 'Waiting for approval...'}
        {isConfirming && 'Confirming...'}
        {!isPending && !isConfirming && 'Verify Now'}
      </button>

      {error && (
        <div className="mt-4 text-sm text-red-600 text-center">
          {error.message.includes('Already verified')
            ? 'Already verified'
            : 'Transaction failed. Please try again.'}
        </div>
      )}

      {isSuccess && (
        <div className="mt-4 text-sm text-green-600 text-center">
          Verification successful!
        </div>
      )}
    </div>
  );
}
