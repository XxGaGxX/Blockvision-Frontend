import React from 'react'

function contacts() {
  return (
    <div>
      <div className="container-fluid p-5">
        <div className="row p-5">
          <div className="col p-5">
            <h1>Contact Us</h1>
            <p className='fs-6 mt-4'>Feel free to use
              the form or drop us an email. Old-fashioned phone calss work too.</p>
            <div className="container-fluid d-flex flex-column mt-4">
              <div className="d-flex">
                <i className="bi bi-telephone"></i>
                <p className='fs-6 mx-2'>+39 123 456 7890</p>
              </div>
              <div className="d-flex">
                <i class="bi bi-envelope"></i>
                <p className='fs-6 mx-2'>diego.vagnini.stud@ispascalcomandini.it</p>
              </div>
              <div className="d-flex">
                <i class="bi bi-envelope"></i>
                <p className='fs-6 mx-2'>thomas.granieri.stud@ispascalcomandini.it</p>
              </div>
              <div className="d-flex">
                <i class="bi bi-geo-alt"></i>
                <p className='fs-6 mx-2'>IIS Pascal Comandini - sede ITT "Blaise Pascal"</p>
              </div>
            </div>
          </div>
          <div className="col p-5">
            <form>
              <div class="mb-5">
                <label class="form-label">Name</label>
                <div className="row">
                  <div className="col">
                    <input type="text" class="form-control" placeholder="First" />
                  </div>
                  <div className="col">
                    <input type="text" class="form-control" placeholder="Last" />
                  </div>
                </div>
              </div>
              <div class="mb-5">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input type="email" class="form-control" placeholder="name@example.com"/>
              </div>

              <div class="mb-5">
                <label class="form-label">Phone (optional)</label>
                <input type="text" class="form-control" placeholder="xxx-xxx-xxxx"/>
              </div>

              <div className="mb-5">
                <label className='form-label'>Message</label>
                <textarea type="text" className='form-control' row='5' style={{resize:'both'}} placeholder='Type your message'/>
              </div>

              <button type="submit" class="btn btn-success mt-2 fw-bold px-4 rounded-pill">Submit</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default contacts
