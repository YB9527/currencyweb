import  Api from './Api.js'

class ProjectApi extends Api{
    constructor() {
      super({path:"project/"});
    }
}
export default ProjectApi;
