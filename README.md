wather app using nextjs 

BTW im not a fully front-end man 👱
this a full stack / MERN stack web application using nextjs ,typescripts, tailwind some front-end libararies ,Mongodb, i create this with help of youtube videos.
and my favorite option about app is i used Kubernetes to deploy it , 
you need few of .envs listing here:
OPENWEATHERMAP_API_KEY   ======> open weather api
AUTH_GOOGLE_ID    ========> google cloud
AUTH_GOOGLE_SECRET   ======> google cloud
NEXTAUTH_URL =====> nextauth docs
NEXTAUTH_SECRET =======> just something
DATABASE_URL =======>Mongo db url / for auth only

you can see docker file and feel free to optimize that .
K8S config written for arvancloud PaaS.
everything is jusr clear ⛹️‍♂️
also this is docker image = amirwz/final-uni:1.2

این یک پروژه هواشناسی با نکست جی اس و مونگو هستش 
با اضافه کردن متغیر های محیطی که دادم براحتی میتونید بالا بیارید اپ یا از ایمیج داکر استفاده کنید
با استفاده از فایل deployment میتونید با استفاده از اروان کلود و سرویس PaaS برای استقرار استفاده کنید.
