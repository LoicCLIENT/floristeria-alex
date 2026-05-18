import { useState, useRef, useEffect } from 'react';
import { X, Send, Flower2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: '¡Hola! 🌸 Bienvenido/a a Floristería Alex. ¿En qué te puedo echar una mano?',
    isBot: true,
    timestamp: new Date(),
  },
];

const quickReplies = [
  '🕐 Horarios',
  '🚚 Envíos',
  '💐 Hacer pedido',
  '💰 Precios',
  '📍 Ubicación',
  '🌹 Rosas',
  '🎁 Eventos',
  '📱 WhatsApp',
];

const botResponses: Record<string, string> = {
  horarios:
    '🕐 ¡Aquí tienes nuestros horarios!\n\n📅 Lunes a Viernes: 9:00 - 20:00\n📅 Sábados: 9:00 - 14:00\n📅 Domingos: Descansamos 😴\n\n¡Te esperamos! 💚',
  envios:
    '🚚 ¡Claro que sí! Hacemos envíos a:\n\n📍 Baix Penedès\n📍 Alt Penedès\n📍 El Garraf\n\n⏰ Si pides antes de las 14:00, ¡te lo llevamos el mismo día! 🎉',
  pedido:
    '💐 ¡Genial que quieras hacer un pedido!\n\nPuedes hacerlo:\n🌐 Aquí en la web\n📱 Por WhatsApp: +34 633 641 074\n\n¡Estamos encantados de ayudarte! 😊',
  rosas:
    '🌹 ¡Las rosas son preciosas!\n\n💝 12 Rosas Rojas: 45€\n💛 Rosas Amarillas: desde 35€\n🩷 Rosas Rosas: desde 38€\n\n¿Te preparo un ramito? 😉',
  precio:
    '💰 ¡Te cuento los precios!\n\n💐 Ramos: desde 30€\n🪴 Plantas: desde 35€\n🎍 Centros florales: desde 50€\n💝 Ramos premium: desde 60€\n\n¡Para todos los bolsillos! 😊',
  ubicacion:
    '📍 ¡Aquí nos puedes encontrar!\n\nAv. Barcelona, 195\n43881 Cunit, Tarragona\n\n🚗 Fácil aparcamiento\n\n¡Ven a vernos cuando quieras! 🌷',
  eventos:
    '🎁 ¡Hacemos flores para todo tipo de eventos!\n\n💒 Bodas\n🎂 Cumpleaños\n🏢 Empresas y oficinas\n⚱️ Funerarios\n💝 San Valentín\n👩 Día de la Madre\n\n📱 Cuéntanos tu idea por WhatsApp y te asesoramos 😊',
  whatsapp:
    '📱 ¡Escríbenos por WhatsApp!\n\n👉 +34 633 641 074\n\nRespondemos rapidísimo 🚀\n¡Te esperamos! 💚',
  pago:
    '💳 ¡Aceptamos varias formas de pago!\n\n✅ Tarjeta de crédito/débito\n✅ Bizum\n✅ Efectivo en tienda\n✅ Transferencia bancaria\n\n¡Como te sea más cómodo! 😊',
  default:
    '🤔 Mmm, no estoy seguro de entenderte...\n\n📱 Escríbenos por WhatsApp al +34 633 641 074 y te atendemos personalmente.\n\n¡Estaremos encantados de ayudarte! 💚',
};

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('horario') || lowerMessage.includes('abierto') || lowerMessage.includes('hora') || lowerMessage.includes('cerrado')) {
    return botResponses.horarios;
  }
  if (
    lowerMessage.includes('envío') ||
    lowerMessage.includes('envio') ||
    lowerMessage.includes('entrega') ||
    lowerMessage.includes('domicilio')
  ) {
    return botResponses.envios;
  }
  if (lowerMessage.includes('pedido') || lowerMessage.includes('comprar') || lowerMessage.includes('pedir') || lowerMessage.includes('encargar')) {
    return botResponses.pedido;
  }
  if (lowerMessage.includes('rosa') || lowerMessage.includes('ramo') || lowerMessage.includes('flor')) {
    return botResponses.rosas;
  }
  if (lowerMessage.includes('precio') || lowerMessage.includes('cuesta') || lowerMessage.includes('coste') || lowerMessage.includes('cuanto') || lowerMessage.includes('cuánto')) {
    return botResponses.precio;
  }
  if (lowerMessage.includes('donde') || lowerMessage.includes('dirección') || lowerMessage.includes('ubicación') || lowerMessage.includes('ubicacion') || lowerMessage.includes('tienda') || lowerMessage.includes('local')) {
    return botResponses.ubicacion;
  }
  if (lowerMessage.includes('evento') || lowerMessage.includes('boda') || lowerMessage.includes('cumpleaños') || lowerMessage.includes('funeral') || lowerMessage.includes('empresa') || lowerMessage.includes('san valentin') || lowerMessage.includes('madre')) {
    return botResponses.eventos;
  }
  if (lowerMessage.includes('whatsapp') || lowerMessage.includes('teléfono') || lowerMessage.includes('telefono') || lowerMessage.includes('llamar') || lowerMessage.includes('contacto') || lowerMessage.includes('contactar')) {
    return botResponses.whatsapp;
  }
  if (lowerMessage.includes('pago') || lowerMessage.includes('pagar') || lowerMessage.includes('tarjeta') || lowerMessage.includes('bizum') || lowerMessage.includes('efectivo')) {
    return botResponses.pago;
  }
  return botResponses.default;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-olive-700 hover:bg-olive-800 rotate-0'
            : 'bg-olive-800 hover:bg-olive-900 hover:scale-105'
        }`}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Flower2 className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-olive-100">
          {/* Header */}
          <div className="bg-olive-800 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
                <Flower2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium text-sm">Floristería Alex</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  <span className="text-olive-200 text-xs">En línea</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-4 space-y-3 bg-cream-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {message.isBot && (
                  <div className="w-7 h-7 bg-olive-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    <Flower2 className="w-3.5 h-3.5 text-olive-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                    message.isBot
                      ? 'bg-white shadow-sm rounded-tl-sm text-gray-700'
                      : 'bg-olive-700 text-white rounded-tr-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-7 h-7 bg-olive-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <Flower2 className="w-3.5 h-3.5 text-olive-600" />
                </div>
                <div className="bg-white shadow-sm px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-olive-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-olive-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1.5 h-1.5 bg-olive-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-3 py-2 border-t border-olive-100 bg-white">
            <div className="flex flex-wrap gap-1.5">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(reply)}
                  className="px-2.5 py-1 bg-olive-50 hover:bg-olive-100 text-olive-700 text-xs font-medium rounded-full transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-olive-50">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe un mensaje..."
                className="flex-1 px-4 py-2 bg-cream-50 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-olive-300 placeholder:text-gray-400"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="w-9 h-9 bg-olive-700 hover:bg-olive-800 disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
