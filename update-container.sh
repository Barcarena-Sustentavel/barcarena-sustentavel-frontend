#!/bin/bash
file_name="fundohydro2.pem"
file_path="./fundohydro2.pem" 
#$(find / -name "$file_name" 2>/dev/null)

echo "$file_path"

if [ -z "$file_path" ]; then
  echo "File '$file_name' not found."
  exit 1
fi
chmod 400 "$file_path"
npm run build

#scp -i "$file_path" -r ./dist root@54.233.210.68:~/barcarena_sustentavel/barcarena-sustentavel-frontend/
scp -i "$file_path" -r ./dist root@54.233.210.68:/home/ubuntu/barcarena_sustentavel/barcarena-sustentavel-frontend
