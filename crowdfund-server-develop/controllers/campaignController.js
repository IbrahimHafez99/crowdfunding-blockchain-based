import asyncHandler from 'express-async-handler';
import Campaign from '../models/campaignModel.js';

// @desc    Create new campaign
// @route   POST /api/campaigns
// @access  Private
const addCampaign = asyncHandler(async (req, res) => {
  const { title, description, image, goal, endAt, minPledge } = req.body;

  try {
    const campaign = new Campaign({
      user: req.user._id,
      name: req.user.name,
      title,
      description,
      image,
      goal,
      endAt,
      minPledge
    });

    const createdCampaign = await campaign.save();

    res
      .status(201)
      .json({ status: 'success', data: { campaign: createdCampaign } });
  } catch (err) {
    res.status(400);
    res.json({ status: 'error', message: err.message });
    throw new Error(err.message);
  }
});

// @desc    Get all deployed campaigns
// @route   GET /api/campaigns/deployed
// @access  Public
const getDeployedCampaigns = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find({ state: 'deployed' }).populate(
    'user',
    'id name'
  );
  res.json({ status: 'success', total: campaigns.length, data: { campaigns } });
});

// @desc    Get deployed campaign by id
// @route   GET /api/campaigns/deployed
// @access  Public
const getDeployedCampaignById = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id).populate(
    'user',
    'id name'
  );

  if (campaign === null) {
    res.status(404);
    res.json({
      status: 'error',
      message: 'Campaign not found'
    });
    throw new Error('Campaign not found');
  } else if (campaign.state === 'deployed') {
    res.json({ status: 'success', data: { campaign } });
  } else {
    res.status(400);
    res.json({
      status: 'error',
      message: 'Requested campaign is not deployed'
    });
    throw new Error('Requested campaign is not deployed');
  }
});

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
const getCampaigns = asyncHandler(async (req, res) => {
  const state = req.query.state;
  let campaigns = [];

  if (state) {
    campaigns = await Campaign.find({ state }).populate('user', 'id name');
  } else {
    campaigns = await Campaign.find({}).populate('user', 'id name');
  }

  res.json({ status: 'success', total: campaigns.length, data: { campaigns } });
});

// @desc    Get campaign by ID
// @route   GET /api/campaigns/:id
// @access  Public
const getCampaignById = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (campaign) {
    res.json({ status: 'success', data: { campaign } });
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'Campaign not found' });
    throw new Error('Campaign not found');
  }
});

// @desc    Get consultation campaigns
// @route   GET /api/campaigns/consultation
// @access  Private/Consultant
const getConsultationCampains = asyncHandler(async (req, res) => {
  const state = req.query.state;

  if (
    state &&
    state !== 'pending' &&
    state !== 'rejected' &&
    state !== 'approved'
  ) {
    res.status(400);
    res.json({ status: 'error', message: 'Not allowed access' });
    throw new Error('Not allowed access');
  }

  let campaigns = [];

  if (state) {
    campaigns = await Campaign.find({ state }).populate('user', 'id name');
  } else {
    campaigns = await Campaign.find({}).populate('user', 'id name');
  }

  res.json({ status: 'success', total: campaigns.length, data: { campaigns } });
});

// @desc    Get consultation campaign by ID
// @route   GET /api/campaigns/consultation/:id
// @access  Private/Consultant
const getConsultationCampainById = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (campaign) {
    if (
      campaign.state !== 'pending' &&
      campaign.state !== 'rejected' &&
      campaign.state !== 'approved'
    ) {
      res.status(400);
      res.json({ status: 'error', message: 'Access denied, not allowed' });
      throw new Error('Access denied, not allowed');
    }

    res.json({ status: 'success', data: { campaign } });
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'Campaign not found' });
    throw new Error('Campaign not found');
  }
});

// @desc    Update campagin approval (approve or reject)
// @route   PATCH /api/campaigns/consultation/pending/:id
// @access  Private/Consultant
const updateCampaignApproval = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (campaign) {
    if (campaign.state !== 'pending') {
      res.status(400);
      res.json({
        status: 'error',
        message: `Not allowed, campaign is already ${campaign.state}`
      });
      throw new Error(`Not allowed, campaign is already ${campaign.state}`);
    }

    const result = req.body.result;
    if (result !== 'rejected' && result !== 'approved') {
      res.status(400);
      res.json({ status: 'error', message: 'Consultation result not allowed' });
      throw new Error('Consultation result not allowed');
    }

    campaign.state = result;

    try {
      const updatedCampaign = await campaign.save();
      res.json({ status: 'success', data: { campaign: updatedCampaign } });
    } catch (err) {
      res.status(400);
      res.json({ status: 'error', message: err.message });
      throw new Error(err.message);
    }
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'Campaign not found' });
    throw new Error('Campaign not found');
  }
});

// @desc    Get logged in user campaigns
// @route   GET /api/campaigns/mine
// @access  Private
const getMyCampaigns = asyncHandler(async (req, res) => {
  const state = req.query.state;
  let campaigns = [];

  if (state) {
    campaigns = await Campaign.find({ user: req.user._id, state });
  } else {
    campaigns = await Campaign.find({ user: req.user._id });
  }

  res.json({ status: 'success', total: campaigns.length, data: { campaigns } });
});

// @desc    Deploy campaign to be deployed (add address)
// @route   POST /api/campaigns/deployed
// @access  Private
const deployCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.body.id);

  if (campaign) {
    if (!campaign.user._id.equals(req.user.id)) {
      res.status(403);
      res.json({
        status: 'error',
        message: 'Not allowed, premission denied'
      });
      throw new Error('Not allowed, premission denied');
    }

    if (campaign.state !== 'approved') {
      res.status(400);
      res.json({
        status: 'error',
        message: `Not allowed, campaign is already ${campaign.state}`
      });
      throw new Error(`Not allowed, campaign is already ${campaign.state}`);
    }

    const address = req.body.address;
    campaign.address = address;
    campaign.state = 'deployed';
    campaign.startAt = new Date();

    try {
      const updatedCampaign = await campaign.save();
      res.json({ status: 'success', data: { campaign: updatedCampaign } });
    } catch (err) {
      res.status(400);
      res.json({ status: 'error', message: err.message });
      throw new Error(err.message);
    }
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'Campaign not found' });
    throw new Error('Campaign not found');
  }
});

// @desc    Update campagin balance (finalize request)
// @route   PATCH /api/campaigns/deployed/:id/finalize
// @access  Private
const finalizeCampaignRequest = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findOne({ address: req.body.address });

  if (campaign) {
    if (campaign.state !== 'deployed') {
      res.status(400);
      res.json({
        status: 'error',
        message: `Not allowed, campaign is already ${campaign.state}`
      });
      throw new Error(`Not allowed, campaign is already ${campaign.state}`);
    }

    const amount = req.body.amount;
    if (amount <= 0 || amount > campaign.pledged) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'amount must be greater than zero and campaign balance'
      });
      throw new Error('amount must be greater than zero and campaign balance');
    }

    try {
      campaign.pledged -= amount;
      const updatedCampaign = await campaign.save();
      res.json({ status: 'success', data: { campaign: updatedCampaign } });
    } catch (err) {
      res.status(400);
      res.json({ status: 'error', message: err.message });
      throw new Error(err.message);
    }
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'Campaign not found' });
    throw new Error('Campaign not found');
  }
});

export {
  addCampaign,
  getDeployedCampaigns,
  getDeployedCampaignById,
  getCampaigns,
  getCampaignById,
  getConsultationCampains,
  getConsultationCampainById,
  updateCampaignApproval,
  getMyCampaigns,
  deployCampaign,
  finalizeCampaignRequest
};
