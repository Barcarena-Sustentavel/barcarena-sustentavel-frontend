#!/bin/bash
file_name="fundohydro.pem"
file_path=$(find / -name "$file_name" 2>/dev/null)

echo "$file_path"

if [ -z "$file_path" ]; then
  echo "File '$file_name' not found."
  exit 1
fi
chmod 400 "$file_path"
npm run build

#scp -i /home/marrior/Desktop/acesso.pem -r ./dist ubuntu@3.148.173.110:~/barcarena_sustentavel/barcarena-sustentavel-frontend/
scp -i "$file_path" -r ./dist ubuntu@54.233.210.68:~/barcarena_sustentavel/barcarena-sustentavel-frontend/
