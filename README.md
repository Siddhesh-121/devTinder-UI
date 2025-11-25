#restart pm2 process after every change pushed on backend.

#do below step after every UI changes pushed
npm run build
copy build files (dist folder ) command = sudo scp -r dist/\* /var/www/html/
