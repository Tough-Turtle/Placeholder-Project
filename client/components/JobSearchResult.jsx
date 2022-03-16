import React, { useEffect, useState } from 'react';

// import heart from '../../assets/icons/heart.svg'
// company: "Big Sky Senior Living on Waterford Way"
// isEasyApply: true
// location: "Butte, MT 59701"
// postDate: "PostedJust posted"
// salary: "From $12.41 an hourFull-time8 hour shift +2"
// summary: "Employees are required to wear a mask and COVID test weekly.\n We are looking for a resident care aid to become a part of our compassionate care-giving team."
// title: "Resident Assistant"
// url: "https://www.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0DLoIQ-Rp1dVVWdqLChq92xGYLrE5EAwhzLvvQfHFd6984BaZ14uwRHhSgkG7VgtiRPoh3gWDqVYEvhPvx3pggS0Pz4BY6D7BqGl6o6FPcKxzOvkneOH8IuOc-WVd8Ee2sgP7zg4r5KSQm55Awc28G_Q9o76i_sWy6uyPbDcinKr9YDHoUR9cLho8FTg3N76s-t5zq3qClxOqDYUAjdq-7jquQLnAtMeom5vYJwGT3puO3wVP2HXTWuxuVG7u0vqJs7PaZKYNWndvqGs_GtQ7_YSPhmGEkxc1p9c8iLJfkXEiiN3PsdmbSjacTU_Gbpl1H0TxmJVNiwdGbqBdtElIM0jkDGY6gmPtKxdtO9XFhm5krMmwTZ25dgrHKgwusLtZzotZRXxwvMvrWfCvULVuhRUkGcaC_TPo4Dp-JWVtCQi3tpi3LLyq0aCjcrHAcQ2sPlYuw3_BTyknCrQCwWZYoQiOJNYWtT3PPVkZ_pOLrk_w==&p=0&fvj=1&vjs=3"
// [[Prototype]]:  Object

export const JobSearchResult = props => {
  const { postDate, title, company, isEasyApply, salary, url, location, summary } = props.data;

  // const username = props.username;

  const [favorited, setFavorited] = useState(false);

  /*
  {
    date_posted: 'Tuesday', title: 'Monkey Manager', source: 'Indeed', company_name: 'Bronx Zoo', detail_url: 'https://uniqueurl1.com', location: 'Bronx', country: 'USA', state: 'NY', city: 'NY', description: 'Must have 2 years prior zookeeping experience. Monkey whispering preferred.'
  }
  */

  const handleSelectFavorite = e => {
    // console.log(e)
    // console.log(e.target.parentElement)
    // console.log(e.target.parentElement.previousSibling.lastChild.innerText)
    // console.log(e.target.parentElement.parentElement)

    const data = JSON.stringify({
      user: props.username,
      url: e.target.parentElement.previousSibling.lastChild.innerText,
    });

    console.log('body data in handle select favorite', data);

    if (!favorited) {
      fetch('http://localhost:3001/user', {
        method: 'POST',
        header: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: data,
      })
        .then(res => res.json())
        .then(data => {
          console.log('got stuff back');
          console.log(data);
          setFavorited(true);
        })
        .catch(err => console.log(err));
    } else {
      // fetch('http://localhost:3001/user', {
      //   method: 'DELETE',
      //   header: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Content-Type': 'application/json',
      //   },
      //   body: data,
      // })
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log('got stuff back');
      //     console.log(data);
      setFavorited(false);
    }
  };
  return (
    <div className="search-result">
      <div className="result-col">
        <h2>Job Title</h2>
        <p>{title}</p>
      </div>
      <div className="result-col">
        <h2>Company</h2>
        <p>{company}</p>
      </div>
      <div className="result-col">
        <h2>Location</h2>
        <p>{location}</p>
      </div>
      <div className="result-col">
        <h2>Description</h2>
        <p>{summary}</p>
      </div>
      <div className="result-col">
        <h2>Salary</h2>
        <p>{salary}</p>
      </div>
      <div className="result-col">
        <h2>Easy Apply</h2>
        <p>{isEasyApply ? 'Yes' : 'No'}</p>
      </div>
      <div className="result-col">
        <h2>Date Posted</h2>
        <p>{postDate}</p>
      </div>

      <div className="result-col">
        <h2>URL</h2>
        <p>{url}</p>
      </div>
      <div className="result-col like-btn-container">
        <h2>Favorite</h2>
        {/* <img src='../../assets/icons/heart.svg' width='20px'/> */}
        {!favorited ? (
          <div className="favorite-btn" onClick={handleSelectFavorite}></div>
        ) : (
          <div className="favorite-btn selected" onClick={handleSelectFavorite}></div>
        )}
      </div>
    </div>
  );
};
