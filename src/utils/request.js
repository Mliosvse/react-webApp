
export  default function request(method, url, body) {
    method = method.toUpperCase();
    if(method==='GET'){
        body = undefined;
    }else {
        body = body && transformRequest(body);
    }

    function transformRequest(obj) {
        var str = [];
        for(var i in obj){
            str.push(encodeURIComponent(i)+ "=" + encodeURIComponent(obj[i]));
        }

        return str.join("&");
    }

    return fetch(url, {
        method,
        credentials: 'include',
        mode: "cors",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Accept': 'application/json',
            //   'Access-Token': sessionStorage.getItem('access_token') || ''
        },
        body
    }).then((res) => res.json()).then(res =>{
        // if(res.code==='0018'){
        //     hashHistory.push('/login');
        // }
        return res;
    });
}

export const get = url => request('GET', url);
export const post = (url, body) => request('POST', url, body);
export const put = (url, body) => request('PUT', url, body);
export const del = (url, body) => request('DELETE', url, body);