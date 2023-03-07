import asyncHandler from 'express-async-handler';
import Campaign from '../models/campaignModel.js';
import Contribution from '../models/contributionModel.js';

// @desc    Funding campaign
// @route   POST /api/contributions/fund
// @access  Private
const fundCampaign = asyncHandler(async (req, res) => {
  const { campaignId, amount } = req.body;
  const campaign = await Campaign.findById(campaignId);

  if (campaign) {
    if (campaign.state !== 'deployed') {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Campaign is not deployed'
      });
      throw new Error('Campaign is not deployed');
    }

    if (campaign.endAt < new Date()) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Campaign has already ended'
      });
      throw new Error('Campaign has already ended');
    }

    if (campaign.minPledge > amount) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Value is less than minimum contribution'
      });
      throw new Error('Value is less than minimum contribution');
    }

    try {
      let contribution;
      const contributionList = await Contribution.find({
        user: req.user._id,
        campaign: campaign._id
      });

      if (contributionList.length === 0) {
        campaign.contributors++;

        contribution = new Contribution({
          contributor: req.user._id,
          campaign: campaign._id,
          amount
        });
      } else {
        contribution = contributionList[0];
        contribution.amount += amount;
      }

      campaign.pledged += amount;
      await campaign.save();
      const createdContribution = await contribution.save();

      res.status(201).json({
        status: 'success',
        data: { contribution: createdContribution }
      });
    } catch (err) {
      res.status(400);
      res.json({ status: 'error', message: err.message });
      throw new Error(err.message);
    }
  } else {
    res.status(404);
    res.json({
      status: 'error',
      message: 'Campaign not found'
    });
    throw new Error('Campaign not found');
  }
});

// @desc    Refunding campaign
// @route   DELETE /api/contributions/refund
// @access  Private
const refundCampaign = asyncHandler(async (req, res) => {
  const { campaignId } = req.body;
  const campaign = await Campaign.findById(campaignId);

  if (campaign) {
    if (campaign.state !== 'deployed') {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Campaign is not deployed'
      });
      throw new Error('Campaign is not deployed');
    }

    if (campaign.endAt < new Date()) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Campaign has already ended'
      });
      throw new Error('Campaign has already ended');
    }

    try {
      const contributionList = await Contribution.find({
        user: req.user._id,
        campaign: campaign._id
      });

      if (contributionList.length === 0) {
        res.status(400);
        res.json({
          status: 'error',
          message: 'You are not a contributor in this campaign'
        });
        throw new Error('You are not a contributor in this campaign');
      } else {
        const contribution = contributionList[0];

        campaign.contributors--;
        campaign.pledged -= contribution.amount;
        await campaign.save();

        await contribution.remove();

        res.status(204).json();
      }
    } catch (err) {
      res.status(400);
      res.json({ status: 'error', message: err.message });
      throw new Error(err.message);
    }
  } else {
    res.status(404);
    res.json({
      status: 'error',
      message: 'Campaign not found'
    });
    throw new Error('Campaign not found');
  }
});

// @desc    Get logged in user contributions
// @route   GET /api/contributions/mine
// @access  Private
const getMyContributions = asyncHandler(async (req, res) => {
  const contributions = await Contribution.find({
    contributor: req.user._id
  })
    // .populate(['contributor', 'campaign']) // get contributor and campaign documents
    // .populate('campaign', 'user name title description goal pledged'); // get specific field in campaign document
    .populate('campaign');

  res.json({
    status: 'success',
    total: contributions.length,
    data: { contributions }
  });
});

export { getMyContributions, fundCampaign, refundCampaign };
