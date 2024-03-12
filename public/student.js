export default class Student {

  constructor(data) {

    Object.assign(this, data);

  }

  static async load(id){
    let res = await fetch(`/api/students/${id}`);//promise GET
    let data = await res.json();//promise
    return new Student(data);
  }

  async declare(deptCode){//NON GET
    let body = {dept: deptCode};
    let res = await fetch("/api/students/knazir", {
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
}
