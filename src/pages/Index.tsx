import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    { id: 'diagnostics', name: 'Диагностика компьютера', price: 500, icon: 'Search' },
    { id: 'virus', name: 'Удаление вирусов', price: 800, icon: 'Shield' },
    { id: 'os', name: 'Установка Windows', price: 1000, icon: 'HardDrive' },
    { id: 'upgrade', name: 'Апгрейд комплектующих', price: 1500, icon: 'Cpu' },
    { id: 'network', name: 'Настройка сети и Wi-Fi', price: 700, icon: 'Wifi' },
    { id: 'recovery', name: 'Восстановление данных', price: 2000, icon: 'Database' },
  ];

  const calculateTotal = () => {
    return services
      .filter(s => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">💻 Компьютерный Мастер</h1>
            <div className="hidden md:flex gap-6">
              {['Главная', 'Услуги', 'Обо мне', 'Прайс', 'Отзывы', 'Контакты', 'FAQ'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-gray-700 hover:text-primary transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="главная" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Быстрый и Надёжный
            <br />
            <span className="text-primary">Ремонт Компьютеров</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Профессиональный подход к каждому клиенту. Диагностика бесплатно при заказе ремонта!
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => scrollToSection('калькулятор')} size="lg" className="text-lg">
              Рассчитать стоимость
            </Button>
            <Button onClick={() => scrollToSection('контакты')} variant="outline" size="lg" className="text-lg">
              Связаться со мной
            </Button>
          </div>
        </div>
      </section>

      <section id="услуги" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Мои Услуги</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} size={24} className="text-primary" />
                  </div>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>От {service.price} ₽</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="калькулятор" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12">Калькулятор Стоимости</h2>
          <Card>
            <CardHeader>
              <CardTitle>Выберите нужные услуги</CardTitle>
              <CardDescription>Отметьте все необходимые работы для расчёта стоимости</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={service.id}
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => toggleService(service.id)}
                      />
                      <label htmlFor={service.id} className="font-medium cursor-pointer">
                        {service.name}
                      </label>
                    </div>
                    <span className="text-primary font-semibold">{service.price} ₽</span>
                  </div>
                ))}
              </div>
              {selectedServices.length > 0 && (
                <div className="mt-6 p-6 bg-primary/10 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Итого:</span>
                    <span className="text-3xl font-bold text-primary">{calculateTotal()} ₽</span>
                  </div>
                  <Button className="w-full mt-4" size="lg" onClick={() => scrollToSection('контакты')}>
                    Заказать услуги
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="обо-мне" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Обо мне</h2>
              <p className="text-gray-600 mb-4">
                Привет! Меня зовут Александр, и я занимаюсь ремонтом компьютеров уже более 10 лет.
              </p>
              <p className="text-gray-600 mb-4">
                За это время я помог сотням клиентов решить самые разные проблемы — от простой чистки до сложного восстановления данных.
              </p>
              <p className="text-gray-600">
                Работаю честно, быстро и всегда объясняю, что именно делаю с вашим компьютером. Даю гарантию на все работы!
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 h-96 flex items-center justify-center">
              <Icon name="User" size={120} className="text-primary/40" />
            </div>
          </div>
        </div>
      </section>

      <section id="прайс" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Прайс-лист</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {services.map((service, index) => (
                  <div key={service.id} className={`p-6 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <Icon name={service.icon as any} size={24} className="text-primary" />
                        <span className="font-semibold">{service.name}</span>
                      </div>
                      <span className="text-xl font-bold text-primary">{service.price} ₽</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="отзывы" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Отзывы клиентов</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Мария К.', text: 'Быстро починил мой ноутбук! Очень доволен результатом и ценой.', rating: 5 },
              { name: 'Дмитрий С.', text: 'Профессионал своего дела. Восстановил все важные файлы после сбоя.', rating: 5 },
              { name: 'Елена П.', text: 'Приятный в общении мастер. Всё объяснил понятно и починил быстро.', rating: 5 },
              { name: 'Игорь Т.', text: 'Отличная работа! Компьютер работает как новый. Рекомендую!', rating: 5 },
            ].map((review, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="контакты" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Контакты</h2>
          <p className="text-gray-600 mb-8">Свяжитесь со мной удобным способом</p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="Phone" size={32} className="text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+79991234567" className="text-primary font-semibold hover:underline">
                  +7 (999) 123-45-67
                </a>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="Mail" size={32} className="text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:master@example.com" className="text-primary font-semibold hover:underline">
                  master@example.com
                </a>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="MessageCircle" size={32} className="text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="https://wa.me/79991234567" className="text-primary font-semibold hover:underline">
                  Написать
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12">Частые вопросы</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Как долго длится ремонт?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Простая диагностика занимает 30-60 минут. Мелкий ремонт — в тот же день. Сложные работы могут занять 2-3 дня.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Даёте ли вы гарантию?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Да, на все работы предоставляется гарантия от 1 до 6 месяцев в зависимости от типа услуги.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Выезжаете ли на дом?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Да, выезд на дом в пределах города — 500 ₽. При заказе работ на сумму от 2000 ₽ — выезд бесплатно!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Какие способы оплаты принимаете?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Наличные, перевод на карту, оплата по QR-коду. Оплата производится после завершения работ.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">💻 Компьютерный Мастер</h3>
          <p className="text-gray-400 mb-6">
            Профессиональный ремонт компьютеров и ноутбуков с 2014 года
          </p>
          <div className="flex justify-center gap-6">
            <a href="tel:+79991234567" className="hover:text-primary transition-colors">
              <Icon name="Phone" size={24} />
            </a>
            <a href="mailto:master@example.com" className="hover:text-primary transition-colors">
              <Icon name="Mail" size={24} />
            </a>
            <a href="https://wa.me/79991234567" className="hover:text-primary transition-colors">
              <Icon name="MessageCircle" size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
