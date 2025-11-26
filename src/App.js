import { useEffect, useState, useRef } from 'react'
import SliderSlick from 'react-slick'
import { ConstructorService, Loading } from 'website-lib'
import { Container, Row, Col, Image, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import InputMask from "react-input-mask";

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function App() {

  const [website, setWebsite] = useState(undefined)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBtnAccessVip, setShowBtnAccessVip] = useState(false);
  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);

  const handleChange = (fn) => (e) => {
    e.target.style.border = '';
    fn(e);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return
    setLoading(true)

    if (!formValidate()) {
      setLoading(false)
      return
    }

    setError(false)

    const message = `Novo cadastro via site Panobianco Ibiúna:
      Nome: ${name}
      Email: ${email}
      Celular: ${phone}
    `

    if (!await sendMail(message)) {
      setError(true);
      console.log('Notification sending failed')
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 3000));

    setShowBtnAccessVip(true);
    setName('');
    setEmail('');
    setPhone('');

    setRegisteredSuccessfully(true);      
    setLoading(false);
  };

  const formValidate = () => {
    if (!name || name.length < 3) {
      const fieldName = document.getElementById('formName');
      fieldName.focus();
      fieldName.scrollIntoView({ behavior: 'smooth', block: 'center' });
      fieldName.style.border = '5px solid red';
      return false;
    }

    if (!email || !emailValidate(email)) {
      const fieldEmail = document.getElementById('formEmail');
      console.log('fieldEmail', fieldEmail)
      console.log('email', email)
      fieldEmail.focus();
      fieldEmail.scrollIntoView({ behavior: 'smooth', block: 'center' });
      fieldEmail.style.border = '5px solid red';
      return false;
    }

    if (!phone || !phoneValidate(phone)) {
      const fieldPhone = document.getElementById('formPhone');
      fieldPhone.focus();
      fieldPhone.scrollIntoView({ behavior: 'smooth', block: 'center' });
      fieldPhone.style.border = '5px solid red';
      return false;
    }

    return true;
  }

  const phoneValidate = (phone) => {
    return /^\(\d{2}\) \d{5}-\d{4}$/.test(phone)
  }

  const emailValidate = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const sendMail = async (data) => {
    const body = createBody(data)
    const response = await fetch(`${process.env.REACT_APP_API_CONTROLLER}/send-mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Website-Id': process.env.REACT_APP_WEBSITE_ID,
        'Authorization': `Bearer ${process.env.REACT_APP_API_MAIL_KEY}`
      },
      body: JSON.stringify(body)
    })

    if (response.ok) {
      return true
    } else {
      setError(true);
      return false
    }
  }

  const createBody = (message) => {
    return {
      'senderName': 'Site Panobianco Ibiúna',
      'sender': 'contato@nois.dev.br',
      'recipientName': 'Panobianco Ibiúna',
      'recipient': 'lucas.2601@gmail.com',
      'title': 'Nova inscrição via site',
      'message': message
    }
  }

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "400px",
    slidesToShow: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          centerPadding: "50px",
        }
      }
    ]
  };

  useEffect(() => {

    const constructorService = new ConstructorService()

    const fetchData = async () => {
      try {
        const constructorService = new ConstructorService()
        const website = await constructorService.fetchWebsiteFromApi(process.env.REACT_APP_WEBSITE_ID, process.env.REACT_APP_API)

        setWebsite(website)
        console.log('website', website)
      } catch (error) {
        console.error('Erro ao fazer conexão com a API:', error.message)

        try {
          const website = constructorService.fetchWebsiteFromCache()
          
          if (!website) {
            throw new Error('Nenhum cache encontrado')
          }

          console.warn('Usando dados do cache para construção do site')
          setWebsite(website)
        } catch (error) {
          console.error('Erro ao carregar o site: ', error.message)
          setWebsite({ error: true })
        }
      }
    }

    fetchData()
  }, [])

  if (website === undefined) {
    return <Loading />
  }
  
  return (
    <Container fluid>
      <Row>
        <Col lg={12} style={{ backgroundImage: 'linear-gradient(to bottom, #444, #694938ff)', padding: '50px', color: 'white' }}>
          <Container>
            <Row>
              <Col lg={12} className='mb-5'>
                <div className='montserrat-700' style={{ fontSize: '20px', color: '#ff6101' }}>
                  A ESTRUTURA
                </div>
                <div className='bebas-neue-700' style={{ fontSize: '50px', color: '#FFF' }}>
                  QUE TRANSFORMA SEU TREINO
                </div>
              </Col>
              <Col lg={4} className='g-2'>
                <div className='itens-estrutura equipamentos-alto-padrao'>
                  <div className='bebas-neue-400 itens-estrutura-texto' style={{ fontSize: '36px' }}>
                    EQUIPAMENTOS DE ALTO PADRÃO
                  </div>
                </div>
              </Col>
              <Col lg={4} className='g-2'>
                <div className='itens-estrutura musculacao-e-cardio'>
                  <div className='bebas-neue-400 itens-estrutura-texto' style={{ fontSize: '36px' }}>
                    MUSCULAÇÃO E CARDIO
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <Row>
                  <Col xs={6} lg={6} className='g-2'>
                    <div className='bloco'>
                      <div className='bebas-neue-400 bloco-texto'>
                        ARMÁRIOS ROTATIVOS
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} lg={6} className='g-2'>
                    <div className='bloco'>
                      <div className='bebas-neue-400 bloco-texto'>
                        DUCHAS AQUECIDAS
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} lg={6} className='g-2'>
                    <div className='bloco'>
                      <div className='bebas-neue-400 bloco-texto'>
                        AR-CONDICIONADO CLIMATIZADORES
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} lg={6} className='g-2'>
                    <div className='bloco'>
                      <div className='bebas-neue-400 bloco-texto'>
                        ESTACIONAMENTO
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col lg={{ span: 6, offset: 3 }}>
                <Button className='bebas-neue-400 mt-5 pisca' href="#formulario">
                  QUERO FAZER PARTE DO GRUPO VIP!
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col lg={12} className='box-slider' style={{ backgroundColor: '#FFF' }}>
          <Container>
            <Row>
              <Col lg={12} className='text-center'>
                <div className='bebas-neue-400' style={{ fontSize: '40px' }}>
                  O TREINO QUE VOCÊ PROCURA, AQUI TEM.
                </div>
                <div style={{ fontSize: '14px' }}>
                  *Verifique a disponibilidade
                </div>
              </Col>
              <Col xs={12} lg={12}>
                <div className="slider-container">
                  <SliderSlick
                    ref={slider => {
                      sliderRef = slider;
                    }}
                    {...settings}
                  >
                    <div>
                      <Row style={{ padding: '1em' }}>
                        <Col>
                          <div className='slider fitdance-zumba-ritbox'>
                            <div className='slider-texto bebas-neue-400' style={{ fontSize: '30px', color: '#FFF' }}>
                              <div>
                                FITDANCE,
                              </div>
                              <div>
                                ZUMBA
                              </div>
                              <div>
                                E RITBOX
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row style={{ padding: '1em' }}>
                        <Col>
                          <div className='slider spinning-rpm'>
                            <div className='slider-texto bebas-neue-400' style={{ fontSize: '30px', color: '#FFF' }}>
                              <div>
                                SPINNING,
                              </div>
                              <div>
                                RPM
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row style={{ padding: '1em' }}>
                        <Col>
                          <div className='slider step-gap-jump'>
                            <div className='slider-texto bebas-neue-400' style={{ fontSize: '30px', color: '#FFF' }}>
                              <div>
                                STEP, GAP
                              </div>
                              <div>
                                E JUMP
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row style={{ padding: '1em' }}>
                        <Col>
                          <div className='slider funcional-ritbox-step'>
                            <div className='slider-texto bebas-neue-400' style={{ fontSize: '30px', color: '#FFF' }}>
                              <div>
                                FUNCIONAL,
                              </div>
                              <div>
                                RITBOX E
                              </div>
                              <div>
                                STEP
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row style={{ padding: '1em' }}>
                        <Col>
                          <div className='slider pilates-e-artes-marciais'>
                            <div className='slider-texto bebas-neue-400' style={{ fontSize: '30px', color: '#FFF' }}>
                              <div>
                                PILATES E
                              </div>
                              <div>
                                ARTES
                              </div>
                              <div>
                                MARCIAIS
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </SliderSlick>
                  <div style={{ textAlign: "center" }}>
                    <Row>
                      <Col xs={6} lg={{ span: 2, offset: 4 }} className='g-2'>
                        <div className="slider-button button" onClick={previous}>
                          <GoArrowLeft fontSize={30} />
                        </div>
                      </Col>
                      <Col xs={6} lg={2} className='g-2'>
                        <div className="slider-button button" onClick={next}>
                          <GoArrowRight fontSize={30} />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={{ span: 6, offset: 3 }}>
                <Button className='bebas-neue-400 mt-5 mb-5 pisca' href="#formulario">
                  QUERO FAZER PARTE DO GRUPO VIP!
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col lg={12} style={{ backgroundColor: '#2a2f31', color: 'white' }}>
          <Row>
            <Col lg={6}>
              <Image src='images/banner-sua-academia.png' width="100%"/> 
            </Col>
            <Col lg={6} className='box-franquia'>
              <div className='montserrat-400' style={{ fontSize: '20px' }}>
                PANOBIANCO
              </div>
              <div className='bebas-neue-700 texto-laranja'>
                A MAIOR
              </div>
              <div className='bebas-neue-700 texto-laranja'>
                FRANQUEADORA
              </div>
              <div className='bebas-neue-100 texto-branco'>
                <span style={{ fontWeight: '300' }}>
                  DE ACADEMIAS
                </span>
              </div>
              <div className='bebas-neue-100 texto-branco'>
                DO BRASIL
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={12} style={{ backgroundColor: '#000', padding: '50px', color: 'white' }}>
          <Container>
            <Row>
              <Col lg={6} className='mt-5 d-flex flex-column justify-content-center' style={{ textAlign: 'center' }}>
                <div className='bebas-neue-400' style={{ fontSize: '80px' }}>
                  Ainda
                </div>
                <div className='bebas-neue-400' style={{ fontSize: '80px' }}>
                  não está
                </div>
                <div className='bebas-neue-400' style={{ color: '#ff6101', fontSize: '80px' }}>
                  no nosso
                </div>
                <div className='bebas-neue-400' style={{ color: '#ff6101', fontSize: '80px' }}>
                  grupo VIP?
                </div>
              </Col>
              <Col lg={6}>
                <div className='montserrat-400 mb-5 text-center mt-5'>
                  <div style={{ fontSize: '28px' }}>
                    Cadastre-se para receber o link do grupo VIP!
                  </div>
                  <div className='mt-3' style={{ fontSize: '22px' }}>
                    Preencha seus dados no formulário abaixo, clique em cadastrar e aguarde para o botão com o link do grupo VIP aparecer.
                  </div>
                </div>
                <Form id="formulario">
                  <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      id="formName"
                      type="text"
                      placeholder="Digite o seu nome"
                      value={name}
                      onChange={handleChange(e => setName(e.target.value))}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                      id="formEmail"
                      type="email"
                      placeholder="Digite o seu e-mail" 
                      value={email}
                      onChange={handleChange(e => setEmail(e.target.value))}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      id="formPhone"
                      as={InputMask}
                      mask='(99) 99999-9999'
                      placeholder="(99) 99999-9999"
                      value={phone}
                      onChange={handleChange(e => setPhone(e.target.value))}
                    />
                  </Form.Group>
                  <Button onClick={handleSubmit} disabled={loading || registeredSuccessfully} className='bebas-neue-400 mt-3' style={{ fontSize: '24px', padding: '20px', backgroundColor: '#ff6101', border: 'none', width: '100%' }}>
                    {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      ENVIANDO... AGUARDE PARA RECEBER O LINK DO GRUPO VIP
                    </>
                  ) : (
                    registeredSuccessfully ? "CADASTRO REALIZADO COM SUCESSO" : "ME CADASTRAR NO GRUPO VIP"
                  )}
                  </Button>
                  <Alert variant="danger" className='mt-3 text-center' style={{ display: error ? 'block' : 'none' }}>
                    <b>Ops!</b> Ocorreu um problema ao enviar seu cadastro. Por favor, tente novamente.
                  </Alert>
                  <Button id='btnAccessVip' className='bebas-neue-400 mt-4' style={{ fontSize: '24px', padding: '20px', backgroundColor: '#ff6101', border: 'none', width: '100%', display: showBtnAccessVip ? 'block' : 'none' }} href="https://chat.whatsapp.com/14999999999" target="_blank" >
                    ACESSAR GRUPO VIP
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col lg={12} style={{ backgroundColor: '#000', padding: '50px', color: 'white' }}>
          <Container>
            <Row>
              <Col className='text-center'>
                Panobianco Ibiúna © 2025 - Todos os direitos reservados.
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
    // <Router>
    //   <Routes>
    //     <Route element={<MainLayout website={website} />}>
    //       {website.pages.map((page) => (
    //         <Route
    //           key={page.path}
    //           path={page.path}
    //           element={
    //             <PageRenderer
    //               website={website}
    //               page={page}
    //             />
    //           }
    //         />
    //       ))}
    //     </Route>
    //   </Routes>
    // </Router>
  )
}

export default App