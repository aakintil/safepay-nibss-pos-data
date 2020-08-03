const mongoose = require('mongoose');

const TransactionsSchema = new mongoose.Schema({
  todayTxnVol: { type: String },
  todayVolFailedTransactions: { type: String },
  todayFailureRate: { type: String },
  todayAvgProcessingTime: { type: String },
  success: {
    todaySuccessPercentage: { type: String },
    todaySuccessVolOutward: { type: String },
  },
  processorsError: {
    todayProcessorsErrorPercentage: { type: String },
    todayProcessorsErrorVol: { type: String },
  },
  customerError: {
    todayCustomerErrorPercentage: { type: String },
    todayCustomerErrorVol: { type: String },
  },
  issuerError: {
    todayIssuerErrorPercentage: { type: String },
    todayIssuerErrorVol: { type: String },
  },
  acquireBankError: {
    todayAcquireBankErrorPercentage: { type: String },
    todayAcquireBankErrorVol: { type: String },
  },
  securityError: {
    todaySecurityErrorPercentage: { type: String },
    todaySecurityErrorVol: { type: String },
  },
  nibssError: {
    todayNibssErrorPercentage: { type: String },
    todayNibssErrorVol: { type: String },
  },
  otherError: {
    todayOtherErrorPercentage: { type: String },
    todayOtherErrorVol: { type: String },
  },
},
{
  timestamps: true,
});

TransactionsSchema.index({ todayTxnVol: 'text', todayVolFailedTransactions: 'text' });
TransactionsSchema.index({ todayTxnVol: 1, todayVolFailedTransactions: 1 });


module.exports = mongoose.model('Transactions', TransactionsSchema);
