import { Router } from 'express';
import {
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
} from '../../controllers/campaignController.js';
import { protect, admin, consultant } from '../../middleware/authMiddleware.js';

const router = Router();

router
  .route('/deployed')
  .get(getDeployedCampaigns)
  .post(protect, deployCampaign);
router.get('/deployed/:id', getDeployedCampaignById);
router.patch('/deployed/requests/finalize', protect, finalizeCampaignRequest);

router.get('/consultation', protect, consultant, getConsultationCampains);
router
  .route('/consultation/:id')
  .get(protect, consultant, getConsultationCampainById)
  .patch(protect, consultant, updateCampaignApproval);

router.get('/mine', protect, getMyCampaigns);

router.route('/').post(protect, addCampaign).get(getCampaigns);
router.route('/:id').get(getCampaignById);

export default router;
