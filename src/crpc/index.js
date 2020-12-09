import axios from 'axios';

class CRPC {
    newRequest(conf) {
        const { reqJson, context, path, method = 'post' } = conf;
        return new Promise((resolve,reject) => {
            axios({
                url: 'fcgi/' + path,
                method,
                data: reqJson
            })
            .then(res =>{
                const data = res.data;
                if(data && data.succ === false) {
                    if(context) {
                        context.$message.error(data.errorMsg || `${path}报错了`);
                    }
                    reject();
                } else {
                    resolve(data);
                }
            })
            .catch(err => {
                reject(err);
            });
        });
    }
}

export default new CRPC();