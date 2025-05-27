#!/bin/bash

# Access the arguments using "$@"
while getopts v:d:p: flag
do
    case "${flag}" in
        v) valid=${OPTARG};;
        d) domain=${OPTARG};;
        p) path=${OPTARG};;
    esac
done

echo "days valid: $valid"
echo "domain: $domain"
echo "path: /certs/$path/ssl/"

if [ -z "$valid" ] || [ -z "$domain" ] || [ -z "$path" ]; then
  echo "Domain, path and valid days are requered"
  exit 1
fi

echo "Creating self-signed certificate valid for $valid days for domain $domain"

# Note that this will also create any intermediate directories that don't exist
mkdir -p /certs/$path/ssl/

# Generate the SSL certificates
openssl req -x509 \
  -nodes \
  -subj "/CN=$domain" \
  -addext "subjectAltName=DNS:$domain" \
  -days $valid \
  -newkey rsa:2048 -keyout /certs/$path/ssl/key.pem \
  -out /certs/$path/ssl/cert.pem

echo "Certificate generation completed."

# Exit the script
exit 0
