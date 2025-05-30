#!/bin/bash

# Access the arguments using "$@"
while getopts v:d:n: flag
do
    case "${flag}" in
        v) valid=${OPTARG};;
        d) domain=${OPTARG};;
        n) name=${OPTARG};;
    esac
done

echo "days valid: $valid"
echo "domain: $domain"
# echo "path: /.dev/ssl/$path/"

if [ -z "$valid" ] || [ -z "$domain" ] || [ -z "$name" ]; then
  echo "Domain, name and valid days are requered"
  exit 1
fi

echo "Creating self-signed certificate valid for $valid days for domain $domain"

# Note that this will also create any intermediate directories that don't exist
mkdir -p "./.dev/ssl/private/"
mkdir -p "./.dev/ssl/certs/"

# Generate the SSL certificates
openssl req -x509 \
  -nodes \
  -subj "/CN=$domain" \
  -addext "subjectAltName=DNS:$domain" \
  -days $valid \
  -newkey rsa:2048 -keyout .dev/ssl/private/$name.key \
  -out .dev/ssl/certs/$name.crt

echo "Certificate generation completed."

# Exit the script
exit 0
