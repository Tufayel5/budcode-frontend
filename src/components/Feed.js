import React, { useContext, useEffect, useState } from 'react';
import './Feed.css';
import { Form, Button } from 'react-bootstrap';
import { axiosInstance } from '../util/config';
import { UserContext } from '../util/context';

export default function Feed() {
  const [projectData, setProjectData] = useState([]);
  const [updateInput, setUpdateInput] = useState({
    subject: '',
    body: '',
    project: '',
  });
  const username = JSON.parse(window.localStorage.getItem('username'));

  let { authorization, setUpdatesList, updatesList } = useContext(UserContext);
  if (!authorization) {
    authorization = JSON.parse(window.localStorage.getItem('token'));
  }

  const handleInputChange = ({ target: { name, value } }) => {
    setUpdateInput({
      ...updateInput,
      [name]: value,
    });
  };

  const handleAddUpdate = () => {
    console.log('meow, ', { stateId: updateInput.project, projectData });
    const { projectId, projectName } = projectData.find(
      (item) => item.projectId === parseInt(updateInput.project)
    );
    const { subject, body } = updateInput;
    const update = {
      projectId,
      projectName,
      subject,
      body,
      author: username,
      time_posted: new Date().toLocaleString(),
    };

    const sortedData = [...updatesList, update].sort((a, b) => {
        return new Date(a.time_posted) < new Date(b.time_posted) ? 1 : -1;
      });

    setUpdatesList(sortedData);
    localStorage.setItem('updates', JSON.stringify(sortedData));

    axiosInstance
      .post(
        `/projects/${updateInput.project}/updates`,
        { subject, body },
        { headers: { authorization: 'Bearer ' + authorization } }
      )
      .then((res) => {
        console.log('res-post:', res);
      });
  };

  const getProjectsList = () => {
    axiosInstance.get(`/users/${username}`).then((res) => {
      setProjectData(res.data.projectMemberships);
      setUpdateInput({
        ...updateInput,
        project: res.data.projectMemberships[0].projectId,
      });
    });
  };

  useEffect(() => {
    getProjectsList();
  }, []);

  return (
    <div className='postapp'>
      <div className='page-title'>
        <h1>Feed</h1>
      </div>
      <div className='project-form'>
        <div className='form-group form-element'>
          <select
            name='project'
            onChange={handleInputChange}
            className='form-select'
          >
            {projectData?.map((project, index) => (
              <option key={`project-option-${index}`} value={project.projectId}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group form-element'>
          <input
            name='subject'
            type='text'
            className='form-control'
            placeholder='Title'
            value={updateInput.subject}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group  form-element'>
          <input
            name='body'
            type='textarea'
            className='form-control'
            placeholder='Updates'
            value={updateInput.body}
            onChange={handleInputChange}
          />
        </div>
        <button
          className='btn btn-primary form-element'
          onClick={handleAddUpdate}
        >
          Post
        </button>
      </div>
      <div className='project-updates'>
        {updatesList?.map((update, index) => (
          <div key={`project-update-item-${index}`} className='update-card'>
            <div className='custom-card-header'>
              <h2>{update.projectName}</h2>
              <h4>{update.author}</h4>
            </div>
            <div className='custom-card-body'>
              <h2>{update.subject}</h2>
              <h4>{update.body}</h4>
            </div>
            <div className='custom-card-footer'>
              <p>{update.time_posted}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
