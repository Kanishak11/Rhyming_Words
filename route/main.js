const express = require('express')
const axios = require('axios')
const router  = express.Router()
trendingWords = []
router.get('/',(req,res) => {
    res.render('showTrending',{arr:trendingWords,name:""})
})
router.get('/words',(req,res) => {
  res.redirect('/')
})

router.post('/words' , async (req,res) => {
    const name = req.body.name
    check(name)
    const getWords = async () => {
        try {
          return await axios.get(`https://api.datamuse.com//words?rel_rhy=${name}`)
        } catch (error) {
          console.error(error)
        }
      }
      const word = async () => {
        try{
        const myWord = await getWords()
        let arr = [...myWord.data];
        if(arr.length >10) arr=arr.slice(0,10)
        let message = "Results for";
        if(arr.length === 0){
          message = "no similar word"
        }
        res.render('showWords' ,{arr:arr,message:`${message} ${name}` ,name:name} )
    }catch(err){
        console.log(err)  
        res.render('home',{arr:[],message:"error",name:""})
    }
      } 
      word()
})
function check(word){
  trendingWords = trendingWords.filter(val => val !== word);
  if(trendingWords.length>10){
    trendingWords.pop()
  }
  trendingWords.push(word.toUpperCase())
}

module.exports = router;
