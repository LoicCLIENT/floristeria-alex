import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ChevronRight,
  Truck,
  MessageCircle,
} from 'lucide-react';
import { Input, Textarea } from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - in production, this would save to Supabase
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In production, uncomment this:
      // await saveContactMessage(formData);

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Dirección',
      content: 'Av. Barcelona, 195\n43881 Cunit, Tarragona',
      link: 'https://maps.google.com/?q=Av+Barcelona+195+Cunit+Tarragona',
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+34 633 641 074',
      link: 'tel:+34633641074',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@floristeriaalex.com',
      link: 'mailto:info@floristeriaalex.com',
    },
    {
      icon: Clock,
      title: 'Horario',
      content: 'Lun-Vie: 9:00-20:00\nSáb: 9:00-14:00',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-600 transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Contacto</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-cream-100 py-12 md:py-16">
        <div className="container-custom text-center">
          <h1 className="heading-2 mb-4">Contáctanos</h1>
          <p className="text-body max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o quieres hacer un pedido especial? Estamos
            aquí para ayudarte. También puedes escribirnos por WhatsApp.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-soft p-8">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="heading-3 mb-4">¡Mensaje Enviado!</h3>
                <p className="text-body mb-6">
                  Gracias por contactarnos. Te responderemos lo antes posible.
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="outline">
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
                  Envíanos un mensaje
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu nombre"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="tu@email.com"
                    />
                    <Input
                      label="Teléfono"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+34 600 000 000"
                    />
                  </div>
                  <Textarea
                    label="Mensaje"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="¿En qué podemos ayudarte?"
                    className="min-h-[150px]"
                  />
                  <Button type="submit" fullWidth loading={isSubmitting}>
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>

                {/* WhatsApp CTA */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-3 text-center">
                    ¿Prefieres respuesta inmediata?
                  </p>
                  <a
                    href="https://wa.me/34633641074?text=Hola,%20me%20gustaría%20hacer%20un%20pedido"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Escríbenos por WhatsApp
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-soft p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm text-gray-600 hover:text-primary-600 whitespace-pre-line transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-600 whitespace-pre-line">
                          {info.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Area */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">
                    Zona de Reparto
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Realizamos entregas a domicilio de lunes a sábado en:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Baix Penedès', 'Alt Penedès', 'El Garraf', 'Cunit', 'Cubelles', 'Segur de Calafell', 'El Vendrell', 'Vilanova i la Geltrú'].map((zone) => (
                      <span
                        key={zone}
                        className="px-3 py-1 bg-cream-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {zone}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.1234567890123!2d1.6347!3d41.1984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a3f9b8c7d6e5f4%3A0x1234567890abcdef!2sAv.%20Barcelona%2C%20195%2C%2043881%20Cunit%2C%20Tarragona!5e0!3m2!1ses!2ses!4v1234567890123"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Floristería Alex en Cunit"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Quick Links */}
            <div className="bg-cream-100 rounded-2xl p-6">
              <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
                Preguntas Frecuentes
              </h3>
              <ul className="space-y-3">
                {[
                  '¿Hacen envíos el mismo día?',
                  '¿Entregan en todo el Baix Penedès?',
                  '¿Puedo personalizar un ramo?',
                  '¿Cuál es el horario de entrega?',
                ].map((question, index) => (
                  <li key={index}>
                    <Link
                      to="#"
                      className="text-sm text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                      {question}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
