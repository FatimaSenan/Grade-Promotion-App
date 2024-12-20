import React from 'react'
import Box from '@mui/material/Box';
import NavbarAdministration from '../../components/administration/NavbarAdministration';
import { rechercheTypes } from '../../Activities/activitésRechercheTypes';
import { enseignementTypes } from '../../Activities/activitésEnseignementTypes';
import TableActivities from '../../components/commission/TableActivities';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ActivitiesTableForSelectedUser() {
  // Données pour les activités de recherche
  const location = useLocation();
  const {prof} = location.state || {};
  const [activities, setActivities] = useState([]);
  console.log('prof', prof);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/commission/activities/selected-user', {
            params: {
                email: prof.email
            },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
     
       const extractedData = response.data; 
       setActivities(extractedData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
}, []);
console.log(activities);
  return (
    <>
    <NavbarAdministration/>
    <Box height={30}/>
    <Box sx={{display:'flex'}}>
      
      <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
        {/* Tableau pour les activités de recherche */}
        <TableActivities types={enseignementTypes} activityType="Activités d'enseignement" activities={activities} selectedUser={prof}/>
        {/* Ajoute un espace vertical entre les deux tableaux */}
        <Box height={30}/> 
        {/* Tableau pour les activités d'enseignement */}
        <TableActivities types={rechercheTypes} activityType="Activités de recherche" activities={activities} selectedUser={prof}/>
        
      </Box>
    </Box>
  </>
  )
}

export default ActivitiesTableForSelectedUser;