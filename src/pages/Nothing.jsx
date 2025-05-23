import React from 'react'
import { Link } from 'react-router';

// Component
import Card from '../Components/Composition/Card';

const Nothing = () => {
  return (
    <section className="container container-center">
      <Card 
        title="Error 404"
        subtitle="Il n'y a rien ici."
        linkName="Redirection"
        link="/"
      />
    </section>        
  )
}

export default Nothing