import React, { PureComponent } from 'react';

class HomeContainer extends PureComponent {
     constructor(props) {
         super(props);
     }

    render() {
        console.log("Home page");
        return (
            <div className='container home'>
                Home page
            </div>
        )
    }
}

export default HomeContainer;
