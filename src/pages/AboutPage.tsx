import React from 'react';
import { Heart, Award, Users, Truck } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { icon: Users, label: 'Доволни клиенти', value: '10,000+' },
    { icon: Award, label: 'Години опит', value: '15+' },
    { icon: Truck, label: 'Доставени поръчки', value: '50,000+' },
    { icon: Heart, label: 'Щастливи любимци', value: '25,000+' }
  ];

  const team = [
    {
      name: 'Мария Петрова',
      role: 'Основател и CEO',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Ветеринарен лекар с 20 години опит в грижата за домашни любимци.'
    },
    {
      name: 'Иван Георгиев',
      role: 'Мениджър продукти',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Експерт в селекцията на най-качествените продукти за животни.'
    },
    {
      name: 'Елена Димитрова',
      role: 'Клиентски консултант',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Специалист по хранене и поведение на домашни любимци.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">За нас</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Ние сме семейна компания, посветена на грижата за домашните любимци в България. 
            От 2009 година помагаме на хиляди семейства да осигурят най-доброто за своите четириноги приятели.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Нашата история</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  PetStore започна като малък семеен бизнес през 2009 година, когато основателката ни 
                  Мария Петрова реши да съчетае своята любов към животните с професионалния си опит 
                  като ветеринарен лекар.
                </p>
                <p>
                  Започнахме с малък магазин в центъра на София, но бързо се разрастнахме благодарение 
                  на доверието на нашите клиенти и качеството на продуктите, които предлагаме.
                </p>
                <p>
                  Днес сме водещият онлайн магазин за домашни любимци в България, но запазваме същите 
                  ценности - качество, грижа и професионализъм във всичко, което правим.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Нашата история"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Нашата мисия</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Да осигурим на всеки домашен любимец в България достъп до най-качествените продукти 
              и професионални съвети за здравословен и щастлив живот.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-blue-50">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Грижа и любов</h3>
              <p className="text-gray-600">
                Всеки продукт е избран с мисълта за здравето и щастието на вашия домашен любимец.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-green-50">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Качество</h3>
              <p className="text-gray-600">
                Работим само с проверени марки и доставчици, за да гарантираме най-високото качество.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-purple-50">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Общност</h3>
              <p className="text-gray-600">
                Изграждаме общност от любители на животни, които споделят опит и знания.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Нашият екип</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Запознайте се с хората, които правят PetStore специално място за всички любители на животни.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;