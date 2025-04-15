#!/bin/bash

npm run build

scp -i /home/marrior/Desktop/acesso.pem -r ./dist ubuntu@3.148.173.110:~/barcarena_sustentavel/barcarena-sustentavel-frontend/
