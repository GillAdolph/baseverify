export const baseVerifyAddress = '0xda5bac43499501b2bfcc22a31989a176c25a273c' as const;

export const baseVerifyABI = [
  {
    type: 'function',
    name: 'verify',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    type: 'function',
    name: 'isVerified',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ type: 'bool' }],
  },
  {
    type: 'function',
    name: 'getVerifiedTime',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'event',
    name: 'Verified',
    inputs: [
      { name: 'user', type: 'address', indexed: false },
      { name: 'time', type: 'uint256', indexed: false },
    ],
  },
] as const;
