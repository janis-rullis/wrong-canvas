# Setup

Open the local hosts
```sh
sudo nano /etc/hosts
```

Add this line
```sh
127.0.0.1	wrong-canvas.local
```

Enable this page in NGINX
```sh
sudo ln -s /var/www/wrong-canvas/Setup/wrong-canvas.conf /etc/nginx/sites-enabled/wrong-canvas.conf
sudo systemctl restart nginx.service
```
Open in the browser [wrong-canvas.local](http://wrong-canvas.local).
