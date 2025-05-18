const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes')
const questionPaper = require('./routes/questionPaperRoutes')
const userSubmitAnswer =require('./routes/userSubmitAnswer')
const userPerformance =require('./routes/userPerformance')
const tagAssociation =require('./routes/associationLinkTag')
const colors = require('colors');
const tagRoutes =require('./routes/tagRoutes')
const { dbConnection } = require('./dbConnection');
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

const app = express();

// Middleware
app.use(bodyParser.json());
// app.use(cors());
app.use(cors())

//mongodbConnection
dbConnection();

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/question-paper', questionPaper);
app.use('/api/submit-answers', userSubmitAnswer);
app.use('/api/user-performance', userPerformance);
app.use('/api/topic-associations', tagAssociation);
app.use('/api/tags',tagRoutes);




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.info.bgWhite));
