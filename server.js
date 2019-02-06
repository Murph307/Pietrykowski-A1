var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    if (query['cmd'] == 'repeat')
    {
      console.log("Handling a request");
      console.log(query);
      var word = query['word'];
      var x = word.length;
      for (var i in query['word'])
      {
          for(i = 1; i <= word.length; i++)
          {
               res.write('<pre>'+word+'</pre>');
          }
          break;
      }
      
      res.end('');
    }
    
    
    if (query['cmd'] == 'dotted')
    {
      console.log("Handling a request");
      console.log(query);
      var word1 = query['word1'];
      var word2 = query['word2'];
      var x1 = word1.length;
      var x2 = word2.length;
      var dots = 30 - (x1 + x2);

      res.write('<pre>' + word1);
      for(i = 0; i < dots; i++)
      {
          res.write(".");
      }
      res.write(word2 + '</pre>');
    }
    
    
    if (query['cmd'] == 'stats')
    {
      console.log("Handling a request");
      console.log(query);
      var sum = 0;
      var min = 0;
      var max = 0;
      var average = 0;
      for (var i in query['grades'])
      {
        sum = sum + parseInt(query['grades'][i]);
        average = sum / query['grades'].length;
      }
      min = query['grades'][0];
      max = query['grades'][0];
      for(var i = 0; i < query['grades'].length; i++)
      {
        if(i + 1 <= query['grades'].length && query['grades'][i] < query['grades'][i + 1] )
        {
          min = query['grades'][i];
        }
      }
      for(var i = 0; i < query['grades'].length; i++)
      {
        if(i - 1 >= 0 && query['grades'][i] > query['grades'][i - 1] )
        {
          max = query['grades'][i];
        }
      }

      res.write('<pre>Ave: ' + average + ' Min: '+ min + ' Max: '+ max +'</pre>');
      
      res.end('');
    }
    else
    {
      res.end('');
    }
    
}