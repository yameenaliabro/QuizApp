import { useState, useEffect } from 'react';
import { Button, Progress, Typography} from 'antd';
import questionsJson from "../../Question/question.json"
import "./quiz.css"
import { FieldTimeOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{  faStar } from '@fortawesome/free-solid-svg-icons';
const { Title } = Typography;
function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | undefined | boolean>(undefined);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [showResult, setShowResult] = useState<number | boolean | string>(false);
  const [showalert, setshowalert] = useState<undefined | boolean>(undefined)
  const [seconds, setSeconds] = useState(45);
  const [clicked, setclicked] = useState(false)
  const [pass, setPass] = useState<null | boolean | string>(null)
  const [wrongAnswer, setWrongAnswer] = useState(0)
  const [value,setValue] = useState(1);
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
  const passingPercentage = (correctAnswers / questions.length) * 100
  const precentage = passingPercentage;
  const computerPercentage = precentage + 3;  
  const redPercentage = computerPercentage > 53 ? 53 : computerPercentage;
  const orangePercentage =
    computerPercentage > 68 ? 68 - 50 : computerPercentage - 50;
  const yellowPercentage =
    computerPercentage > 78 ? 78 - 65 : computerPercentage - 65;
  const greenPercentage =
    computerPercentage > 103 ? 103 - 75 : computerPercentage - 75;
  const handleNextQuestion = () => {
    setshowalert(undefined)
    setPass(null)
    setSeconds(45)
    if (currentQuestionIndex === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } 
    setclicked(false)
  };
  const handleOptionSelect = (option: string) => {
    setValue(value + 1)
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
  return (
    <div className='contain-quiz'>
      {!showResult ? (
        <div className='app'>
          <div className='bar'>
            <Progress percent={(value  / questions.length) * 100} status="active" showInfo={false} />
          </div>
          <div className='first-row'>
            <Title level={3}>Question {currentQuestionIndex + 1} /   of {questions.length}</Title>
            <span><FieldTimeOutlined />{seconds} seconds</span>
          </div>
          <div className='star'>
          <FontAwesomeIcon
              style={{
                color: questions[currentQuestionIndex].difficulty === 'easy' || questions[currentQuestionIndex].difficulty === "medium" || questions[currentQuestionIndex].difficulty === 'hard' ? '#FCA120' : '#dedede"'
              }}
            icon={faStar} />
            <FontAwesomeIcon style={{
                color:questions[currentQuestionIndex].difficulty==="medium" || questions[currentQuestionIndex].difficulty === 'hard' ? "#FCA120" : "#dedede"
            }} icon={faStar} />
            <FontAwesomeIcon style={{
                color: questions[currentQuestionIndex].difficulty==="hard" ?'#FCA120' : "#dedede"
            }} icon={faStar} />
            </div>
          <div className='second-row'>
            <span className='question'>
              {decodeURIComponent(questions[currentQuestionIndex].question)}
            </span>
          </div>
          <div className='main-container'>
            <div className='main-contain'>
              {questions[currentQuestionIndex].incorrect_answers.map((option, index) => (
                <div className='middle-contain'>
                  <Button
                    disabled={clicked}
                    key={index}
                    style={{
                      margin:5,
                      color: "black",
                      width: 230,
                      height: 45,
                      backgroundColor: pass === null ? "white" : (
                        option == selectedOption ? (pass ? "green" : "red") : (
                          questions[currentQuestionIndex].correct_answer === option ? "green" : "white"
                        )
                      )
                      }} 
                    onClick={() => handleOptionSelect(option)}>
                    {decodeURIComponent(option)}
                  </Button>
                </div>
              ))} 
            </div>
          </div>
          <div className='next-button'>
            <Button disabled={!clicked} onClick={handleNextQuestion} className='button'>
              Next
            </Button>
            <div>
              {(showalert != undefined) ? (showalert ? <p className='sucess'>Correct ?</p> :
                <p className='wrong'>Sorry ?</p>) : null}
            </div>
          </div>
           <div className="progress-container">
        <div
          style={{
            width: redPercentage + "%"
          }}
          className="progressInner progress-red"
        />
        {precentage > 50 && (
          <div
            style={{
              width: orangePercentage + "%"
            }}
            className="progressInner progress-orange"
          />
        )}
        {precentage > 65 && (
          <div
            style={{
              width: yellowPercentage + "%"
            }}
            className="progressInner progress-yellow"
          />
        )}
        {precentage >= 75 && (
          <div
            style={{
              width: greenPercentage + "%"
            }}
            className="progressInner progress-green"
          />
        )}
      </div>
        </div>
      ) : (
        <div className='quiz-result'>
          <h2>Quiz Result</h2>
          <p>You scored {correctAnswers} out of {questions.length}</p>
          <Progress percent={(correctAnswers / questions.length) * 100} status="active" type="circle" size={130} />
        </div>
      )}
    </div>
  );
};

export default Quiz;

