function split(){
    const url="http://localhost:3000/search/asd";
    const res=url.split('/')[url.split('/').length-1];
    console.log(res);
}

split();