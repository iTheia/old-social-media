import dev from './dev'
import prod from './prod'

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

let config = {

}
const env = process.env.NODE_ENV

switch (env) {
    case 'development':
    case 'dev':
        config = dev
        break;
    case 'production':
    case 'prod':
        config = prod
        break;
    default:
        config = dev
        break;        
}

export default  config