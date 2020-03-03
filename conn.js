var sql = require("mssql");

    // config for your database
    var con = {
        user: 'webapi',
        password: '@w3bbpf1',
        server: '172.16.80.14\\ITDEV', 
        database: 'BPFInventaris',
        connectionTimeout: 3600000,
        requestTimeout: 3600000,
        multipleStatements: true,
	options: {
                trustedConnection: true,
                useUTC: true
	}
    };
    sql.close();
    sql.connect(con, function (err) {
            
        if(err) throw err;
        var request = new sql.Request();    
    });
    
    module.exports = sql;
