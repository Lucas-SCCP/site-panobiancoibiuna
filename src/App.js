import { useEffect, useState, useRef } from 'react'
import SliderSlick from 'react-slick'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout, PageRenderer, ConstructorService, Loading } from 'website-lib'
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function App() {

  const [website, setWebsite] = useState(undefined)

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
                      <div className='bebas-neue-400 bloco-texto' style={{ fontSize: '23px' }}>
                        ARMÁRIOS ROTATIVOS
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} lg={6} className='g-2'>
                    <div className='bloco'>
                      <div className='bebas-neue-400 bloco-texto' style={{ fontSize: '23px' }}>
                        DUCHAS AQUECIDAS
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} lg={6} className='g-2'>
                    <div className='bloco'>
                      <div className='bebas-neue-400 bloco-texto' style={{ fontSize: '23px' }}>
                        AR-CONDICIONADO CLIMATIZADORES
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} lg={6} className='g-2'>
                    <div className='bloco'>
                      <div className='bebas-neue-400 bloco-texto' style={{ fontSize: '23px' }}>
                        ESTACIONAMENTO
                      </div>
                    </div>
                  </Col>
                </Row>
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
                            FITDANCE, ZUMBA E RITBOX
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row style={{ padding: '1em' }}>
                        <Col>
                          <div className='slider spinning-rpm'>
                            SPINNING, RPM
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row style={{ padding: '1em' }}>
                        <Col>
                          <div className='slider step-gap-jump'>
                            STEP, GAP E JUMP
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row style={{ padding: '1em' }}>
                        <Col>
                          <div className='slider funcional-ritbox-step'>
                            FUNCIONAL, RITBOX E STEP
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row style={{ padding: '1em' }}>
                        <Col>
                          <div className='slider pilates-e-artes-marciais'>
                          PILATES E ARTES MARCIAIS
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </SliderSlick>
                  <div style={{ textAlign: "center" }}>
                    <Row>
                      <Col lg={{ span: 2, offset: 4 }} className='slider-button'>
                        <div className="button" onClick={previous}>
                          <GoArrowLeft fontSize={30} />
                        </div>
                      </Col>
                      <Col lg={2} className='slider-button'>
                        <div className="button" onClick={next}>
                          <GoArrowRight fontSize={30} />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
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
              <Col lg={6} style={{ fontSize: '80px', textAlign: 'center' }} className='bebas-neue-400'>
                <div>
                  Ainda
                </div>
                <div>
                  não está
                </div>
                <div style={{ color: '#ff6101'}}>
                  no nosso
                </div>
                <div style={{ color: '#ff6101'}}>
                  grupo VIP?
                </div>
              </Col>
              <Col lg={6}>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Digite o seu nome" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" placeholder="Digite o seu e-mail" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" placeholder="Digite o seu telefone" />
                  </Form.Group>
                  <Button style={{ backgroundColor: '#ff6101', border: 'none', padding: '10px 20px', width: '100%' }}>
                    QUERO FAZER PARTE DO GRUPO VIP!
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