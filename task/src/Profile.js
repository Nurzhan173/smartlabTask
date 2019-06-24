import React from 'react';
import axios from 'axios';
// import SocialItems from './SocialItems';

class Profile extends React.Component {

  state = { data: [] };


  componentDidMount() {
    axios({
          method: 'post',
          url: 'https://fast-fjord-69046.herokuapp.com/api/v1/user-info/1',
          config: { headers: {'Content-Type': 'application/json' }}
          })
          .then((response) =>  {
            this.setState({data: response.data.data})
          })
          .catch((response) => {
            console.log(response)
          })
  }

  // этот метод работает не правильно, не могу понять почему
  // renderSocialItems(){
  //   return this.state.data.social.map( social =>
  //     <SocialItems key={social.label} social={social} />
  //   )
  // }


  render() {

  const res = this.state.data;
  console.log(res.social);

    return(
      <div>
        <h1>Город {res.city} </h1>
        <h1>Знание языков: </h1>
        <h2>{res.languages}</h2>
      </div>
    );
  }
}


export default Profile;
