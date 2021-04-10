const { httpGet } = require('./mock-http-interface');

// function to call api and extract data.
const handleResult = (results) => 
  // extract input result in key values pairs.
  results.map(({status, body}) => ({
    [status === 200 ? "Arnie Quote" : "FAILURE"] : JSON.parse(body).message
  }));

const getArnieQuotes = async (urls = []) => {
  // considering all input urls are valid and no validation required.
 // map through all item and get series of promise.
 try
    {
      const promises = urls.map(url => httpGet(url));
      // wait for all promises to resolve.
      const result = await Promise.all(promises);
      // process result and return them in required format.
      return handleResult(result);
    }catch(ex) 
    {
      return new Error("exception thrown while calling url");
    }
};

module.exports = {
  getArnieQuotes,
};
