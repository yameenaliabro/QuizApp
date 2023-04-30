import { useState, useEffect } from 'react';
import { Button, Progress, Typography, Col, Row, Rate, Popover, Modal } from 'antd';
import questionsJson from "../../Question/question.json"
import "./Quiz.css"
import { FieldTimeOutlined } from '@ant-design/icons';
import { ProgressBar } from 'react-bootstrap';
const { Title } = Typography;
function Quiz(){
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | undefined | boolean>(undefined);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [showResult, setShowResult] = useState<number | boolean | string>(false);
  const [showalert, setshowalert] = useState<undefined | boolean>(undefined)
  const [seconds, setSeconds] = useState(45);
  const [clicked, setclicked] = useState(false)
  const [pass, setPass] = useState<null | boolean | string>(null)
  const [wrongAnswer, setWrongAnswer] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(interval);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSeconds(45)
        setshowalert(false)
        setWrongAnswer(wrongAnswer + 1)
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [setCurrentQuestionIndex, seconds]);
  const questions = questionsJson.map((eachQuestion) => {
    return {
      ...eachQuestion,
      incorrect_answers: [...eachQuestion.incorrect_answers, eachQuestion.correct_answer]
    }
  })
  const passingPercentage = (correctAnswers / questions.length) * 75
  const failurePercentage = (wrongAnswer / questions.length) * 75
  const handleNextQuestion = () => {
    setshowalert(undefined)
    setPass(null)
    console.log(pass)
    setSeconds(45)
    if (currentQuestionIndex === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    setclicked(false)
  };
  const handleOptionSelect = (option: string) => {
    if (option === questions[currentQuestionIndex].correct_answer) {
      setPass(option)
      setCorrectAnswers(correctAnswers + 1)
      setSelectedOption(option)
      setshowalert(true)
      setPass(true)
    }
    else {
      setshowalert(false)
      setSelectedOption(option)
      setPass(false)
      setWrongAnswer(wrongAnswer + 1)
    }
    setclicked(true)
  };
  let content =(
    <div>
    <Rate count={3} defaultValue={1} /><label>1 Easy</label><br/>
    <Rate count={3} defaultValue={2} /><label>2 Medium</label><br/>
    <Rate count={3} defaultValue={3} /><label>3 Hard</label>
    </div>
  ) 
  console.log({selectedOption, pass})
  return (
    <div className='contain-quiz'>
      {!showResult ? (
        <div className='app'>
          <div className='first-row'>
            <Title level={3}>Question {currentQuestionIndex + 1} /   of {questions.length}</Title>
            <span><FieldTimeOutlined />{seconds} seconds</span>
          </div>
          <div className='second-row'>
            <Popover content={content} trigger="hover" placement='topLeft'>
              <p><Rate defaultValue={2} count={3}/></p>
          </Popover>
            <span className='question'>{questions[currentQuestionIndex].question.split(" ").sort()}</span>
          </div>
          <Row gutter={[8, 8]} style={{
            marginTop: 60          }}>
            {questions[currentQuestionIndex].incorrect_answers.map((option, index) => (
              <Col xs={2} sm={8} md={8} lg={12} xl={12}>
                <Button
                  disabled={clicked}
                  key={index}
                  style={{
                    margin: '5px',
                    color: "black",
                    width: '300px',
                    height: 50,
                    backgroundColor: pass === null ? "white" : (
                      option == selectedOption ? ( pass ? "green" : "red" ) : (
                        questions[currentQuestionIndex].correct_answer === option ? "green" : "white"
                        )
                    )
                  }}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </Button>
              </Col>
            ))}
          </Row>
          <div className='next-button'>
            <Button disabled={!clicked} onClick={handleNextQuestion} className='button'>
              Next
            </Button>
            {(showalert != undefined) ? (showalert ? <p className='sucess'>Correct ?</p> : <p className='wrong'>Sorry ?</p>) : null}
          </div>
          <div className='fourth-row'>
            <ProgressBar style={{
              height: 10
            }}>
              <ProgressBar striped variant="danger" now={failurePercentage} key={3} />
              <ProgressBar variant="warning" now={passingPercentage == 50 && failurePercentage == 25 ? 15 : 0} key={2} />
              <ProgressBar striped variant="success" now={passingPercentage} key={1} />

            </ProgressBar>
          </div>
        </div>
      ) : (
        <div className='quiz-result'>
          <h2>Quiz Result</h2>
          <p>You scored {correctAnswers} out of {questions.length}</p>
          <Progress percent={(correctAnswers / questions.length) * 75} status="active" type="circle" size={130} />
        </div>
      )}
    </div>
  );
};

export default Quiz;

