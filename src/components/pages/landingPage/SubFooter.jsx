import React, { Fragment } from 'react';

const SubFooter = () => (
  <Fragment>
    <div className='testmonial_area'>
      <div className='container-fluid overlay'>
        <div className='row h-100'>
          <div className='col-xl-10 offset-xl-1'>
            <div className='testmonial_info text-center h-100 d-flex flex-column align-items-center justify-content-center'>
              <div className='quote'>
                <i className="fas fa-quote-left"></i>
              </div>
              <p>
                Donec imperdiet congue orci consequat mattis. Donec rutrum
                porttitor <br />
                sollicitudin. Pellentesque id dolor tempor sapien feugiat
                ultrices nec sed neque.
                <br />
                Fusce ac mattis nulla. Morbi eget ornare dui.
              </p>
              <div className='testmonial_author'>
                <h4>Asana Korim</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

export default SubFooter;
