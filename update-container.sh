#!/bin/bash
file_name="novo_acesso.pem"
file_path=$(find / -name "$file_name" 2>/dev/null)

if [ -z "$file_path" ]; then
  echo "File '$file_name' not found."
  exit 1
fi
chmod 400 "$file_path"
npm run build

#scp -i /home/marrior/Desktop/acesso.pem -r ./dist ubuntu@3.148.173.110:~/barcarena_sustentavel/barcarena-sustentavel-frontend/
scp -i "$file_path" -r ./dist ubuntu@52.15.236.100:~/barcarena_sustentavel/barcarena-sustentavel-frontend/
