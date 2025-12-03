import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  Gift,
  Clock,
  Star,
  ChevronDown,
  MessageCircle,
  X
} from 'lucide-react';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [timeLeft, setTimeLeft] = useState(4347);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedVoltage, setSelectedVoltage] = useState('Bivolt');
  const [showChatModal, setShowChatModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ type: 'bot' | 'user', text: string }>>([{ type: 'bot', text: 'Olá! Sou Elise da UtiliStore 👋' }]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const carouselImages = [
    '/51CdXeEV5aL.jpg',
    '/20240903110844_624999376_DMZ.png',
    '/D_NQ_NP_982790-MLB91986822390_092025-O.webp'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 4347;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, [carouselImages.length]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const reviews = [
    {
      name: 'José Santos',
      location: 'Salvador - BA',
      rating: 5,
      text: 'Chegou aqui em Salvador-BA em poucos dias, funcionando perfeitamente, batida forte, pensei que era até mentira mais quando chegou eu pulei de alegria!',
      image: 'https://i.postimg.cc/CMkbSVwc/Screenshot-229.png',
      profileImage: 'https://i.postimg.cc/y6gvR5sm/jose.png',
      date: '2 dias atrás'
    },
    {
      name: 'Renato Silva',
      location: 'Campinas - SP',
      rating: 5,
      text: 'Entrega super rápida aqui em Campinas. Liguei logo que chegou e fiquei impressionado com a potência. A PartyBox Stage 320 encheu a sala inteira sem distorcer nada. Aprovada!',
      image: 'https://i.postimg.cc/zfyRQsdB/Screenshot-230.png',
      profileImage: 'https://i.postimg.cc/PJYWRg5v/carlos.png',
      date: '4 dias atrás'
    },
    {
      name: 'João Victor',
      location: 'Fortaleza - CE',
      rating: 5,
      text: 'Veio antes do prazo! Testei ontem numa reunião com amigos e a caixa dominou tudo. Graves profundos, luzes bonitas e conectou no Bluetooth na hora. Muito satisfeito!',
      image: 'https://i.postimg.cc/26p3KVbX/Screenshot-232.png',
      profileImage: 'https://i.postimg.cc/RhL3f4F5/marcos.png',
      date: '5 dias atrás'
    },
    {
      name: 'Marcos Andrade',
      location: 'Belo Horizonte - MG',
      rating: 5,
      text: 'Som muito mais potente do que eu imaginei. Usei pra um churrasco no quintal e parecia show ao vivo. A bateria segurou firme. Recomendadíssima!',
      image: 'https://i.postimg.cc/wvdTkZnv/468579419237953.jpg',
      profileImage: 'https://i.postimg.cc/5NPyMPQ5/joao.png',
      date: '1 semana atrás'
    },
    {
      name: 'Felipe Nogueira',
      location: 'Porto Alegre - RS',
      rating: 5,
      text: 'Chegou bem rápida aqui em POA. A qualidade do áudio é impecável, principalmente os médios e graves. A função de luz deixou a festa com outra vibe. Gostei muito!',
      image: 'https://i.postimg.cc/Tw9GJwrs/D-NQ-NP-908427-MLA80244216569-102024-F.jpg',
      profileImage: 'https://i.postimg.cc/y6gvR5sm/jose.png',
      date: '1 semana atrás'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 bg-white border-b border-gray-200 py-3 px-4 z-50 flex items-center justify-between">
        <button className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="font-medium text-gray-900">Produto</span>
        <div className="flex gap-2">
          <button className="p-2">
            <Share2 className="w-6 h-6" />
          </button>
          <button className="p-2" onClick={() => setShowCartModal(true)}>
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main>
        <section className="bg-white">
          <div className="relative aspect-square max-w-md mx-auto">
            {carouselImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`PartyBox ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-contain p-8 transition-opacity duration-300 ${
                  idx === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center gap-2 pb-4">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide
                    ? 'bg-orange-500 w-8'
                    : idx === 1
                    ? 'bg-gray-400 w-2'
                    : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </div>
        </section>

        <section className="px-4">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 mb-3 shadow-lg">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-white text-3xl font-bold">R$ 69</span>
                  <span className="text-white text-xl">,90</span>
                </div>
                <div className="text-orange-100 text-xs line-through">R$ 197,15</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <span className="text-white text-lg">⚡</span>
                <span className="text-white text-xs font-bold">OFERTA RELÂMPAGO!</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-white text-xs">
              <span>Economize até 65%</span>
              <span>Termina em <strong>{formatTime(timeLeft)}</strong></span>
            </div>
          </div>

          <div className="bg-pink-50 border border-pink-200 rounded-lg py-2 px-4 mb-4 text-center">
            <span className="text-pink-700 text-sm font-medium">Desconto exclusivo na primeira Compra</span>
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-3">
            Caixa de Som JBL PartyBox Stage 320 com Iluminação LED
          </h1>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-900">4.9</span>
            <span className="text-sm text-gray-600">(1254 avaliações)</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-600">2788 vendidos</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg py-2 px-3">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">Compra Segura</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg py-2 px-3">
              <Truck className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Frete Grátis</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-lg py-2 px-3">
              <Gift className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">12 meses garantia</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg py-2 px-3">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">Suporte 24h</span>
            </div>
          </div>
        </section>

        <section className="px-4 py-6 border-t-8 border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Avaliações (1254)</h2>

          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-end gap-3 mb-3">
              <span className="text-5xl font-bold text-gray-900">4.9</span>
              <div className="mb-2">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-600">1254 avaliações</span>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { stars: 5, count: 1115, percentage: 89 },
                { stars: 4, count: 132, percentage: 10 },
                { stars: 3, count: 7, percentage: 1 },
                { stars: 2, count: 0, percentage: 0 },
                { stars: 1, count: 0, percentage: 0 }
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 w-6">{item.stars}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 w-10 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {reviews.slice(0, showAllReviews ? reviews.length : 2).map((review, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-4">
                <div className="flex items-start gap-3 mb-2">
                  <img
                    src={review.profileImage}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{review.text}</p>
                {review.image && (
                  <img
                    src={review.image}
                    alt="Review"
                    className="w-full rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>

          {!showAllReviews && (
            <button
              onClick={() => setShowAllReviews(true)}
              className="w-full text-orange-600 font-medium text-sm py-3 hover:bg-orange-50 rounded-lg transition-colors"
            >
              Ver todas as avaliações
            </button>
          )}
        </section>

        <section className="px-4 py-6 border-t-8 border-gray-100">
          <div className="flex items-start gap-3 mb-4">
            <img
              src="/eletro copy.png"
              alt="UtiliStore"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900">UtiliStore</span>
                <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                  <Shield className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">Loja Verificada</span>
                </div>
              </div>
              <div className="text-xs text-gray-600">2.135 produtos</div>
              <div className="text-xs text-gray-500">Vendedor desde junho de 2021</div>
            </div>
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`border font-medium px-4 py-1.5 rounded-md transition-colors text-sm ${
                isFollowing
                  ? 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                  : 'border-yellow-500 bg-yellow-400 text-gray-800 hover:bg-yellow-500'
              }`}
            >
              {isFollowing ? 'Seguindo' : 'Seguir'}
            </button>
          </div>
          <button className="text-blue-600 text-sm hover:underline">
            Ver informações da loja
          </button>
        </section>

        <section className="px-4 py-6 border-t-8 border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Sobre o produto</h2>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">Descrição do Produto</h3>
          <div className={`text-sm text-gray-700 leading-relaxed ${!showFullDescription ? 'line-clamp-4' : ''}`}>
            <p className="mb-3">
              A JBL PartyBox Stage 320 é uma opção moderna, prática e sustentável para quem deseja se locomover com agilidade e conforto no dia a dia. Seu design ergonômico e estrutura reforçada garantem estabilidade durante o uso, enquanto o sistema de som potente proporciona uma experiência incrível em diferentes tipos de ambiente.
            </p>
            <p className="mb-3">
              <strong>Características principais:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Potência de 240W RMS para som alto e cristalino</li>
              <li>Bateria de longa duração - até 18 horas de música</li>
              <li>Iluminação LED RGB sincronizada com a música</li>
              <li>Conexão Bluetooth 5.1 estável e rápida</li>
              <li>Entradas para microfone com função karaokê</li>
              <li>Design portátil com rodas e alça telescópica</li>
              <li>Bass boost para graves intensos</li>
              <li>Resistente e durável para uso em festas e eventos</li>
            </ul>
            <p className="mb-3">
              <strong>Especificações técnicas:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Potência: 240W RMS</li>
              <li>Bateria: Até 18 horas</li>
              <li>Conectividade: Bluetooth 5.1, USB, AUX</li>
              <li>Peso: 16.5 kg</li>
              <li>Dimensões: 32 x 69 x 37 cm</li>
            </ul>
          </div>
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-orange-600 text-sm font-medium mt-2 hover:underline"
          >
            {showFullDescription ? 'Ver menos' : 'Ver mais'}
          </button>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div>
            <div className="text-xs text-gray-500 line-through">R$ 197,15</div>
            <div className="text-2xl font-bold text-orange-500">R$ 69,90</div>
          </div>
          <div className="flex gap-2.5">
            <button onClick={() => setShowChatModal(true)} className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5 bg-white shadow-sm">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Chat</span>
            </button>
            <button
              onClick={() => setShowCartModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors font-medium text-sm shadow-sm"
            >
              Comprar Agora
            </button>
          </div>
        </div>
      </footer>

      <div className="h-20"></div>

      {showCartModal && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 animate-fadeIn"
            onClick={() => setShowCartModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl z-[9999] w-full max-w-md animate-slideUp max-h-[90vh] overflow-y-auto">
            <div className="p-6 relative">
              <button
                onClick={() => setShowCartModal(false)}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <h2 className="text-xl font-bold text-gray-900 mb-6">Comprar Produto</h2>

              <div className="flex gap-4 mb-6">
                <img
                  src="/51CdXeEV5aL.jpg"
                  alt="Produto"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Bicicleta Elétrica Street GO com 2 Baterias Incluídas
                  </h3>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-bold text-orange-500">R$ 69,90</span>
                    <span className="text-xs text-gray-400 line-through">R$ 197,15</span>
                    <span className="text-xs font-bold text-orange-500">-65%</span>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
                    Frete grátis
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Voltagem:
                </label>
                <button
                  onClick={() => setSelectedVoltage('Bivolt')}
                  className={`w-full border-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    selectedVoltage === 'Bivolt'
                      ? 'border-orange-500 text-orange-500 bg-orange-50'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Bivolt
                </button>
              </div>

              <button
                onClick={() => {
                  setIsCheckingOut(true);
                  setTimeout(() => {
                    const params = new URLSearchParams(window.location.search);
                    const checkoutUrl = `https://checkout.compra-clique.site/payment/checkout/0946d0d8-7a78-4a0c-a98a-e9c79b23767d${params.toString() ? '?' + params.toString() : ''}`;
                    window.location.href = checkoutUrl;
                  }, 2000);
                }}
                disabled={isCheckingOut}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-lg transition-colors text-base shadow-lg disabled:bg-orange-400 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? 'Finalizando Compra...' : 'Confirmar Compra'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 animate-fadeIn"
            onClick={() => {
              setShowChatModal(false);
              setChatMessages([{ type: 'bot', text: 'Olá! Sou Elise da UtiliStore 👋' }]);
              setIsTyping(false);
            }}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md animate-slideUp flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Chat com o Vendedor</h2>
              <button
                onClick={() => {
                  setShowChatModal(false);
                  setChatMessages([{ type: 'bot', text: 'Olá! Sou Elise da UtiliStore 👋' }]);
                  setIsTyping(false);
                }}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.type === 'bot' && (
                    <div className="flex items-start gap-2">
                      <img src="/eletro.png" alt="Bot" className="w-6 h-6 rounded-full flex-shrink-0 mt-1" />
                      <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] text-sm">
                        {msg.text}
                      </div>
                    </div>
                  )}
                  {msg.type === 'user' && (
                    <div className="bg-orange-500 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%] text-sm">
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <img src="/eletro.png" alt="Bot" className="w-6 h-6 rounded-full flex-shrink-0 mt-1" />
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Escolha uma pergunta:</p>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setChatMessages(prev => [...prev, { type: 'user', text: 'Qual o prazo de entrega?' }]);
                    setIsTyping(true);
                    setTimeout(() => {
                      setIsTyping(false);
                      setChatMessages(prev => [...prev, { type: 'bot', text: 'O prazo de entrega é de 5 a 15 dias úteis no máximo. Temos frete grátis para compras acima de R$ 45,00! 📦' }]);
                    }, 2000);
                  }}
                  className="w-full text-left bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 text-gray-700 rounded-lg px-4 py-2.5 text-sm transition-colors"
                >
                  Qual o prazo de entrega?
                </button>
                <button
                  onClick={() => {
                    setChatMessages(prev => [...prev, { type: 'user', text: 'Tem desconto para pagamento à vista?' }]);
                    setIsTyping(true);
                    setTimeout(() => {
                      setIsTyping(false);
                      setChatMessages(prev => [...prev, { type: 'bot', text: 'Sim! O preço que você está vendo já tem 65% de desconto à vista. É uma oferta imperdível! 💰' }]);
                    }, 2000);
                  }}
                  className="w-full text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg px-4 py-2.5 text-sm transition-colors"
                >
                  Tem desconto para pagamento à vista?
                </button>
                <button
                  onClick={() => {
                    setChatMessages(prev => [...prev, { type: 'user', text: 'Como funciona a devolução?' }]);
                    setIsTyping(true);
                    setTimeout(() => {
                      setIsTyping(false);
                      setChatMessages(prev => [...prev, { type: 'bot', text: 'Você tem 30 dias para devolução sem complicações. Basta entrar em contato conosco e cuidamos de tudo! 🔄' }]);
                    }, 2000);
                  }}
                  className="w-full text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg px-4 py-2.5 text-sm transition-colors"
                >
                  Como funciona a devolução?
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="px-4 py-6 border-t-8 border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-center text-sm text-gray-600">
          <button className="hover:text-orange-600">Política de Privacidade</button>
          <button className="hover:text-orange-600">Termos de Uso</button>
          <button className="hover:text-orange-600">Políticas de Reembolso</button>
          <button className="hover:text-orange-600">Políticas de Envio</button>
          <button className="col-span-2 hover:text-orange-600">Fale Conosco</button>
        </div>
        <div className="mt-6 text-xs text-gray-500 leading-relaxed">
          <p className="font-semibold mb-2">Aviso Legal:</p>
          <p>
            Esta página não faz parte do site da Kwai ou a Kuaishou Technology. Além disso, este site NÃO é endossado pelo Kwai de forma alguma.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
