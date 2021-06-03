class Http {
  static instance = new Http();

  get = async url => {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log('Http get method err', err);
      throw new Error(err);
    }
  };

  post = async (url, body) => {
    try {
      const resp = await fetch(url, {
        method: 'POST',
        body,
      });
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log('Http post method err', err);
      throw new Error(err);
    }
  };

  delete = async url => {
    try {
      const resp = await fetch(url, {method: 'DELETE'});
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log('Http delete method err', err);
      throw new Error(err);
    }
  };

  put = async (url, body) => {
    try {
      const resp = await fetch(url, {
        method: 'POST',
        body,
      });
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log('Http put method err', err);
      throw new Error(err);
    }
  };
}

export default Http;
