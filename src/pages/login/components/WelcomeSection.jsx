import React from 'react';
import Icon from '../../../components/AppIcon';


const WelcomeSection = () => {
  const features = [
    {
      icon: 'BookOpen',
      title: 'Seguimiento Académico',
      description: 'Monitoree el progreso y calificaciones de sus hijos en tiempo real'
    },
    {
      icon: 'MessageCircle',
      title: 'Comunicación Directa',
      description: 'Manténgase en contacto con profesores y personal escolar'
    },
    {
      icon: 'Calendar',
      title: 'Calendario Escolar',
      description: 'Acceda a eventos, tareas y fechas importantes'
    },
    {
      icon: 'Bell',
      title: 'Notificaciones',
      description: 'Reciba alertas sobre asistencia, tareas y anuncios'
    }
  ];

  const certifications = [
    {
      name: 'Certificación ISO 27001',
      icon: 'Shield'
    },
    {
      name: 'Protección de Datos',
      icon: 'Lock'
    },
    {
      name: 'Educación Certificada',
      icon: 'Award'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center lg:text-left">
        <div className="mb-6">
          <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="GraduationCap" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                SchoolConnect
              </h1>
              <p className="text-sm text-primary font-medium">
                Portal de Padres
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4">
          Conecte con la educación de sus hijos
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Una plataforma integral que le permite mantenerse informado sobre el progreso académico, 
          comunicarse con educadores y participar activamente en la experiencia educativa de sus hijos.
        </p>
      </div>
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 bg-card border border-border rounded-lg hover:shadow-elevation-1 transition-shadow duration-200">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-medium text-foreground mb-1">
                {feature?.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Trust Signals */}
      <div className="bg-muted/30 rounded-xl p-6">
        <h3 className="font-heading font-medium text-foreground mb-4 text-center">
          Seguridad y Confianza Garantizada
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-3 justify-center sm:justify-start">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name={cert?.icon} size={16} className="text-success" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {cert?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-2xl font-heading font-bold text-primary mb-1">
            15K+
          </div>
          <div className="text-sm text-muted-foreground">
            Familias Conectadas
          </div>
        </div>
        <div>
          <div className="text-2xl font-heading font-bold text-primary mb-1">
            98%
          </div>
          <div className="text-sm text-muted-foreground">
            Satisfacción
          </div>
        </div>
        <div>
          <div className="text-2xl font-heading font-bold text-primary mb-1">
            24/7
          </div>
          <div className="text-sm text-muted-foreground">
            Acceso Disponible
          </div>
        </div>
      </div>
      {/* Testimonial */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={20} />
          </div>
          <div>
            <p className="text-muted-foreground italic mb-3">
              "SchoolConnect ha transformado la manera en que me mantengo conectada con la educación de mis hijos. 
              La comunicación con los profesores es fluida y siempre estoy al día con su progreso."
            </p>
            <div>
              <div className="font-medium text-foreground">María Rodríguez</div>
              <div className="text-sm text-muted-foreground">Madre de 2 estudiantes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;