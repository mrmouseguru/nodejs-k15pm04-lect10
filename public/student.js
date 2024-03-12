export default class Student {

  constructor(data) {

    Object.assign(this, data);
    this._uri = `/api/students/${this.id}`;

  }

  static async load(id){
    let res = await fetch(`/api/students/${id}`);//promise GET
    let data = await res.json();//promise
    return new Student(data);
  }

  async declare(deptCode){//NON GET
    let body = {dept: deptCode};
    let res = await fetch(this._uri, {
      method: "PATCH",
      headers: {"Content-Type" : "application/json" },
      body: JSON.stringify(body)//data sent
    });

    let data = await res.json();//promise

    if(res.status !== 200){
      throw new Error(data.error);
    }

    this.dept = data.dept;

  }

  // GET: /api/students/:id/courses
  async listCourses(){

    let res = await fetch(`${this._uri}/courses`);
    let json = await res.json();

    return json.courses;


  }
}
