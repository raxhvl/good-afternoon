#!/bin/bash

# Load env
source .env

# Define the array of chains
chains=("ANVIL" )

# Loop through each chain and deploy
for chain in "${chains[@]}"; do
  # Fetch the RPC URL from the environment variable
  rpc_url_var="${chain}_RPC_URL"
  rpc_url="${!rpc_url_var}"

  if [ -z "$rpc_url" ]; then
    echo "RPC URL for $chain not found in environment variables"
    continue
  fi

  # Deploy
  echo "Deploying for $chain with RPC URL: $rpc_url"
  forge script script/Deploy.s.sol:Deploy --rpc-url "$rpc_url" --broadcast
done
