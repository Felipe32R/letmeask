


```
                       ![logo](https://github.com/Felipe32R/letmeask/blob/main/src/assets/images/logo.svg)
```



An useful Q&A platform developed in **#NLW Together** by [**Rocketseat**](https://rocketseat.com.br/) using [**React**](https://pt-br.reactjs.org/), [**Typescript**](https://www.typescriptlang.org/) and  [**Firebase**](https://firebase.google.com/?hl=pt).



#### Google authentication



![auth](https://user-images.githubusercontent.com/73653212/125149573-1b60ff00-e110-11eb-81e5-7c3b7e792399.gif)



#### Creating a room



![createroom](https://user-images.githubusercontent.com/73653212/125149568-1439f100-e110-11eb-8732-db82a3e93a93.gif)



After this, all you need is share the code to people join your room and start sending questions! 😁

You can end the room when you want.

The admin can also highlight, mark as answered and delete questions:



![room1](https://user-images.githubusercontent.com/73653212/125150699-3c2d5280-e118-11eb-871b-e06fc1b2f563.png)

![room2](https://user-images.githubusercontent.com/73653212/125150702-4a7b6e80-e118-11eb-8bf2-ddf5a442e102.png)





#### Normal user view

The users can send questions and send likes on the questions

![room3](https://user-images.githubusercontent.com/73653212/125150709-5cf5a800-e118-11eb-95be-19519ad90c4a.png)



#### Follow these steps below to run this application

```bash
$ git clone https://github.com/Felipe32R/letmeask.git  

$ cd letmeask

npm start 
or 
yarn start
```

#### Firebase Realtime Database rules

````sql
{
  "rules": {
    "rooms":{
      ".read": false,
    	".write": "auth != null",
      "$roomId":{
        ".read": true,
        ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
      	"questions":{
          ".read": true,
          ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)",
        "likes":{
          ".read":true,
          ".write":"auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
        	}  
      	}
      }
    }
  }
}

````

#### Firebase configurations with react (.env.local)

````sql
REACT_APP_API_KEY="AIzaSyBgNMnL1Q8EzqxmfO7cBiDZduI17lo1QXA"
REACT_APP_AUTH_DOMAIN="letmeask-6022d.firebaseapp.com"
REACT_APP_DATABASE_URL="https://letmeask-6022d-default-rtdb.firebaseio.com"
REACT_APP_PROJECT_ID="letmeask-6022d"
REACT_APP_STORAGE_BUCKET="letmeask-6022d.appspot.com"
REACT_APP_MESSAGING_SENDER_ID="959342397726"
REACT_APP_APP_ID="1:959342397726:web:9794d538f7dfb4aa36a10f"
````

