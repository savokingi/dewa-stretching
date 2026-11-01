'use strict';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const directions = [
  {name:'Аэройога',category:'gentle',image:'gallery-24.webp',caption:'ВРЕМЯ ОТПУСТИТЬ СУЕТУ',meta:'Гибкость, баланс, новые ощущения',description:'Знакомство с движением на подвесных полотнах. Гамак помогает исследовать баланс и почувствовать тело по-новому.',detail:'На занятии вы знакомитесь с гамаком, осваиваете положения и упражнения под руководством тренера. Темп и варианты выполнения подбираются с учётом группы. Если вы впервые — скажите об этом перед началом.',facts:['55 минут','Групповой формат','Занятия в гамаках']},
  {name:'Пилатес',category:'gentle',image:'gallery-31.webp',caption:'МЕНЬШЕ СУЕТЫ. БОЛЬШЕ КОНТРОЛЯ.',meta:'Контроль, дыхание, глубокая работа',description:'Точное движение, внимание к дыханию и спокойная работа над силой. Время лучше познакомиться со своим телом.',detail:'Пилатес объединяет контролируемые упражнения с вниманием к положению корпуса и дыханию. Тренер объясняет технику и помогает подобрать вариант выполнения.',facts:['55 минут','Контролируемый темп','Работа на коврике']},
  {name:'Растяжка',category:'gentle',image:'gallery-3.webp',caption:'ЧУТЬ СВОБОДНЕЕ В КАЖДОМ ДВИЖЕНИИ',meta:'Гибкость и внимание к ощущениям',description:'Постепенная работа над гибкостью. Понятные упражнения, спокойное дыхание и внимание к собственным ощущениям.',detail:'На тренировке последовательно работают с разными группами мышц. Тренер помогает освоить положения и корректирует технику. Уровень подготовки и важные ограничения стоит обсудить до начала.',facts:['55 минут','Групповой формат','Разные уровни подготовки']},
  {name:'Здоровая спина',category:'gentle',image:'gallery-25.webp',caption:'ДВИЖЕНИЕ ПОСЛЕ РАБОЧЕГО ДНЯ',meta:'Подвижность и работа с мышцами корпуса',description:'Внимательная работа с подвижностью и мышцами, которые помогают нам двигаться каждый день.',detail:'Формат сочетает упражнения для мышц корпуса и работу над подвижностью. При особенностях здоровья заранее согласуйте подходящую нагрузку со специалистом и сообщите тренеру о важных ограничениях.',facts:['55 минут','Внимание к технике','Групповой формат']},
  {name:'Боди Фитнес',category:'energy',image:'gallery-30.webp',caption:'ПОЧУВСТВОВАТЬ, НА ЧТО ВЫ СПОСОБНЫ',meta:'Сила, динамика и энергия',description:'Динамичная работа с силой и выносливостью. Для тех дней, когда хочется добавить энергии и почувствовать мышцы.',detail:'Тренировка сочетает аэробную и силовую нагрузку. Это более интенсивный формат: если вы выбираете первое занятие, обсудите опыт и подходящую нагрузку с администратором.',facts:['55 минут','Активный темп','Силовая нагрузка']},
  {name:'Зумба',category:'energy',image:'gallery-23.webp',caption:'ВКЛЮЧИТЬ МУЗЫКУ. ОТПУСТИТЬ ДЕНЬ.',meta:'Музыка, движение и настроение',description:'Танцевальная тренировка под музыку. Двигайтесь вместе с группой, пробуйте новое и ловите свой ритм.',detail:'Занятие строится на танцевальных движениях под латиноамериканскую и популярную музыку. Тренер показывает последовательности, а вы постепенно присоединяетесь к ритму группы.',facts:['55 минут','Танцевальный фитнес','Групповой формат']}
];

const trainers = [
  {name:'Юлия Ромашко',image:'trainer-julia.webp',about:'Мастер спорта по акробатике, дипломированный тренер по гимнастике и акробатике. Ведёт групповые и персональные занятия.',detail:'Аэройога, пилатес, растяжка и занятия для спины. Посмотрите ближайшие тренировки Юлии в действующем расписании студии.'},
  {name:'Светлана Соколова',image:'trainer-svetlana.webp',about:'Мастер спорта по художественной гимнастике. Тренер групповых и персональных занятий, с опытом в силовых направлениях и стретчинге.',detail:'Растяжка, аэройога и фитнес. Выберите занятие в расписании или попросите администратора подобрать формат.'}
];

let activeDirection = 0;
function selectDirection(index) {
  activeDirection = index;
  const item = directions[index];
  const image = $('#direction-image');
  image.src = `assets/${item.image}`;
  image.alt = `${item.name} в студии DEWA`;
  $('#direction-description').textContent = item.description;
  $('#direction-photo-label').textContent = item.caption;
  $$('.direction-row').forEach(button => {
    const active = Number(button.dataset.index) === index;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
}

function renderDirections(filter = 'all') {
  const visible = directions.map((item,index)=>({...item,index})).filter(item => filter==='all'||item.category===filter);
  $('#direction-list').replaceChildren(...visible.map(item => {
    const button=document.createElement('button');
    button.type='button'; button.className='direction-row'; button.dataset.index=item.index;
    button.innerHTML=`<span class="direction-number">0${item.index+1}</span><span><span class="direction-row-title">${item.name}</span><span class="direction-row-meta">${item.meta}</span></span><span class="direction-row-arrow" aria-hidden="true">↗</span>`;
    button.setAttribute('aria-label',`${item.name}: показать описание`);
    button.addEventListener('click',()=>selectDirection(item.index));
    button.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')selectDirection(item.index);});
    button.addEventListener('focus',()=>selectDirection(item.index));
    return button;
  }));
  selectDirection(visible.some(item=>item.index===activeDirection)?activeDirection:visible[0].index);
}
renderDirections();
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  $$('[data-filter]').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});
  renderDirections(button.dataset.filter);
}));

const dialogs = $$('dialog');
let restoreFocus;
function openDialog(dialog) {
  if(!dialogs.some(item=>item.open)) restoreFocus=document.activeElement;
  dialogs.forEach(item=>{if(item.open)item.close();});
  dialog.showModal();
  document.body.classList.add('modal-open');
}
dialogs.forEach(dialog=>{
  $('[data-close]',dialog).addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const box=dialog.getBoundingClientRect();
    if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();
  });
  dialog.addEventListener('close',()=>{
    if(!dialogs.some(item=>item.open)){
      document.body.classList.remove('modal-open');
      if(restoreFocus?.isConnected)restoreFocus.focus({preventScroll:true});
    }
  });
});

let selectedSession='';
function openBooking(interest='Помогите выбрать направление',session='') {
  closeMenu();
  $('#booking-feedback').hidden=true;
  selectedSession=session;
  $('#selected-session').hidden=!session;
  $('#selected-session').textContent=session;
  const select=$('#guest-interest');
  if(![...select.options].some(option=>option.value===interest))select.add(new Option(interest,interest));
  select.value=interest;
  openDialog($('#booking-dialog'));
}
$$('[data-book]').forEach(button=>button.addEventListener('click',()=>openBooking(button.dataset.interest)));
$('#booking-form').addEventListener('submit',event=>{
  event.preventDefault();
  const name=$('#guest-name').value.trim();
  const interest=$('#guest-interest').value;
  let message='Здравствуйте! Хочу познакомиться со студией DEWA.';
  if(name)message+=` Меня зовут ${name}.`;
  message+=` Интересует: ${interest}.`;
  if(selectedSession)message+=` Желаемое занятие: ${selectedSession}.`;
  message+=' Подскажите, пожалуйста, доступное время и условия записи.';
  const href=`https://t.me/dewastretchspb?text=${encodeURIComponent(message)}`;
  window.open(href,'_blank','noopener,noreferrer');
  const feedback=$('#booking-feedback');
  feedback.replaceChildren(document.createTextNode('Продолжите переписку с администратором. Если Telegram не открылся, '));
  const link=document.createElement('a'); link.href=href;link.target='_blank';link.rel='noopener';link.textContent='откройте сообщение по ссылке';
  feedback.append(link,document.createTextNode('. Запись подтвердит студия.')); feedback.hidden=false;
});

function directionDetail(index) {
  const item=directions[index];
  $('#detail-content').innerHTML=`<div class="detail-layout"><div class="detail-picture"><img src="assets/${item.image}" alt="${item.name} в студии DEWA"></div><div class="detail-copy"><span class="eyebrow">ДВИЖЕНИЕ В СВОЁМ РИТМЕ</span><h2 id="detail-title">${item.name}</h2><div class="detail-facts">${item.facts.map(fact=>`<span>${fact}</span>`).join('')}</div><p>${item.description}</p><p>${item.detail}</p><button class="solid-button" id="detail-book">Выбрать занятие <span aria-hidden="true">↗</span></button></div></div>`;
  $('#detail-book').addEventListener('click',()=>openBooking(item.name));
  openDialog($('#detail-dialog'));
}
$('#direction-details').addEventListener('click',()=>directionDetail(activeDirection));
$$('[data-trainer]').forEach(button=>button.addEventListener('click',()=>{
  const trainer=trainers[Number(button.dataset.trainer)];
  $('#detail-content').innerHTML=`<div class="detail-layout"><div class="detail-picture"><img src="assets/${trainer.image}" alt="${trainer.name}"></div><div class="detail-copy"><span class="eyebrow">КОМАНДА DEWA</span><h2 id="detail-title">${trainer.name}</h2><p>${trainer.about}</p><p>${trainer.detail}</p><a class="solid-button" href="https://dewastretching.ru/schedule" target="_blank" rel="noopener">Посмотреть расписание <span aria-hidden="true">↗</span></a></div></div>`;
  openDialog($('#detail-dialog'));
}));

const schedule=[
  {date:'2 ноября 2026',classes:[['18:15','Аэройога','Юлия Ромашко','ГИБКОСТЬ И БАЛАНС'],['19:15','Пилатес','Юлия Ромашко','КОНТРОЛЬ И ДЫХАНИЕ'],['20:15','Здоровая спина','Юлия Ромашко','ВНИМАНИЕ К ДВИЖЕНИЮ']]},
  {date:'3 ноября 2026',classes:[['11:00','МФР + растяжка','Юлия Ромашко','РАБОТА С НАПРЯЖЕНИЕМ'],['12:00','Аэройога','Юлия Ромашко','ГИБКОСТЬ И БАЛАНС'],['17:15','Шпагат','Юлия Ромашко','ПОДВИЖНОСТЬ И ГИБКОСТЬ'],['19:15','Боди Фитнес','Юлия Ромашко','СИЛА И ЭНЕРГИЯ'],['20:15','Зумба','Ульяна Соларт','ДВИЖЕНИЕ ПОД МУЗЫКУ']]},
  {date:'4 ноября 2026',classes:[['18:15','Пилатес','Вероника Букетова','КОНТРОЛЬ И ДЫХАНИЕ'],['19:15','Аэройога','Вероника Букетова','ГИБКОСТЬ И БАЛАНС'],['20:15','Здоровая спина','Вероника Букетова','ВНИМАНИЕ К ДВИЖЕНИЮ']]}
];
function renderSchedule(index) {
  const day=schedule[index];
  $('#schedule-table').replaceChildren(...day.classes.map((item,i)=>{
    const row=document.createElement('div');row.className='class-row';row.style.animationDelay=`${i*30}ms`;
    row.innerHTML=`<div class="class-time">${item[0]}<small>55 МИНУТ</small></div><div class="class-name">${item[1]}<span class="class-tag">${item[3]}</span></div><div class="class-trainer">${item[2]}</div><button class="class-book" aria-label="Записаться: ${item[1]}, ${day.date}, ${item[0]}"><span class="class-book-label">Записаться</span><span aria-hidden="true">↗</span></button>`;
    $('.class-book',row).addEventListener('click',()=>openBooking(item[1],`${item[1]} · ${day.date}, ${item[0]} · ${item[2]}`));
    return row;
  }));
}
renderSchedule(0);
$$('[data-day]').forEach(button=>button.addEventListener('click',()=>{
  $$('[data-day]').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});
  renderSchedule(Number(button.dataset.day));
}));

const gallery=[['studio-wide.webp','Пространство студии'],['gallery-19.webp','Поддержка тренера'],['gallery-26.webp','Оливковые полотна'],['gallery-35.webp','Всё для движения']];
let galleryIndex=0;
function showGallery(index) {
  galleryIndex=(index+gallery.length)%gallery.length;
  $('#gallery-image').src=`assets/${gallery[galleryIndex][0]}`;
  $('#gallery-image').alt=gallery[galleryIndex][1];
  $('#gallery-caption').textContent=`${gallery[galleryIndex][1]} · 0${galleryIndex+1} / 0${gallery.length}`;
}
$$('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{showGallery(Number(button.dataset.gallery));openDialog($('#gallery-dialog'));}));
$('#gallery-prev').addEventListener('click',()=>showGallery(galleryIndex-1));
$('#gallery-next').addEventListener('click',()=>showGallery(galleryIndex+1));
$('#gallery-dialog').addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'){event.preventDefault();showGallery(galleryIndex+1);}
  if(event.key==='ArrowLeft'){event.preventDefault();showGallery(galleryIndex-1);}
});

$('#route-open').addEventListener('click',()=>{
  $('#detail-content').innerHTML=`<div class="route-content"><span class="eyebrow">ЛЕНИНСКИЙ ПРОСПЕКТ, 153</span><h2 id="detail-title">Уже почти<br><em>на месте.</em></h2><p>Студия находится на первом этаже БЦ Setl Center, помещение 178.</p><ol><li>Войдите в бизнес-центр. На ресепшене скажите, что идёте в студию растяжки DEWA.</li><li>Через основной круглосуточный вход после турникета поверните направо. Пройдите мимо кофеен и салона красоты.</li><li>За вторым входом справа найдите помещение 178. Второй вход ближе к студии, но работает по будням до 20:00.</li></ol><p>Если вы впервые или не можете найти вход, напишите администратору — вам помогут сориентироваться.</p><a class="solid-button" href="https://yandex.ru/maps/org/70112777694/" target="_blank" rel="noopener">Построить маршрут <span aria-hidden="true">↗</span></a><a class="inline-link official-booking" href="https://t.me/dewastretchspb" target="_blank" rel="noopener">Связаться с администратором ↗</a></div>`;
  openDialog($('#detail-dialog'));
});

const menuToggle=$('.menu-toggle');
const mobileMenu=$('#mobile-menu');
function closeMenu(){mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Открыть меню');document.body.classList.remove('menu-open');$$('main,.footer').forEach(element=>element.inert=false);}
menuToggle.addEventListener('click',()=>{
  const opening=mobileMenu.hidden;mobileMenu.hidden=!opening;menuToggle.setAttribute('aria-expanded',String(opening));menuToggle.setAttribute('aria-label',opening?'Закрыть меню':'Открыть меню');document.body.classList.toggle('menu-open',opening);$$('main,.footer').forEach(element=>element.inert=opening);
});
$$('a',mobileMenu).forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileMenu.hidden){closeMenu();menuToggle.focus();}});
window.addEventListener('resize',()=>{if(window.innerWidth>820)closeMenu();},{passive:true});
const header=$('#header');
let scrollQueued=false;
window.addEventListener('scroll',()=>{
  if(scrollQueued)return;scrollQueued=true;requestAnimationFrame(()=>{header.classList.toggle('scrolled',window.scrollY>25);scrollQueued=false;});
},{passive:true});
header.classList.toggle('scrolled',window.scrollY>25);

if('IntersectionObserver' in window){
  const links=$$('.desktop-nav a');
  const activeObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>{if(link.hash===`#${entry.target.id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});},{rootMargin:'-20% 0px -65% 0px'});
  links.forEach(link=>{const section=$(link.hash);if(section)activeObserver.observe(section);});
  if(!reducedMotion){
    document.documentElement.classList.add('js-motion');
    const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});},{threshold:.08});
    $$('.section-title-row,.space-heading-row,.space-facts,.team-grid,.journal-grid,.faq-intro,.contact-copy').forEach(element=>{element.classList.add('reveal');revealObserver.observe(element);});
  }
}
