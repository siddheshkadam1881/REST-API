var winston = require( 'winston' );
winston.emitErrs=true;

var logger = new( winston.Logger )( {
	transports: [
		new winston.transports.Console({
			level: 'debug',
      handleExceptions:true,
      json:false,
      colorize:true
		}),
		new winston.transports.File( {
    level: 'info',
    filename: './log1/all-log',
    handleExceptions:true,
    json:false,
    colorize:true,
		maxsize: 1024 * 1024 * 10 // 10MB
		})
    ],
	   exitOnError:false
		})
    module.exports=logger;
//
