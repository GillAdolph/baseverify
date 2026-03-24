'use client';

import { WalletButton } from '@/components/WalletButton';
import { VerifyCard } from '@/components/VerifyCard';
import { useAccount } from 'wagmi';
import { base } from 'wagmi/chains';

export default function Home() {
  const { chain } = useAccount();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            BaseVerify
          </h1>
          <p className="text-gray-600">
            One tap onchain verification on Base
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <WalletButton />
        </div>

        {chain && (
          <div className="text-center text-sm mb-4">
            <span className={chain.id === base.id ? 'text-green-600' : 'text-red-600'}>
              {chain.id === base.id ? '✅ Base Mainnet' : '⚠️ Wrong Network'}
            </span>
          </div>
        )}

        <VerifyCard />

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Contract: 0xda5b...273c</p>
          <p className="mt-1">Builder Code: [To be added]</p>
        </div>
      </div>
    </main>
  );
}
