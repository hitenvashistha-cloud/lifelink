import Inventory from '../models/Inventory.js';

// @desc    Get hospital blood inventory
// @route   GET /api/inventory
// @access  Private (Hospital only)
export const getInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.find({ hospital: req.user._id }).sort({ bloodType: 1 });

    res.json({
      success: true,
      count: inventory.length,
      inventory,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add or update blood stock
// @route   POST /api/inventory
// @access  Private (Hospital only)
export const updateInventory = async (req, res, next) => {
  try {
    const { bloodType, unitsAvailable, expiryDate } = req.body;

    let inventory = await Inventory.findOne({
      hospital: req.user._id,
      bloodType,
    });

    if (inventory) {
      inventory.unitsAvailable = unitsAvailable;
      inventory.expiryDate = expiryDate;
      inventory.lastUpdated = Date.now();
      await inventory.save();
    } else {
      inventory = await Inventory.create({
        hospital: req.user._id,
        bloodType,
        unitsAvailable,
        expiryDate,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Inventory updated successfully',
      inventory,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blood type from inventory
// @route   DELETE /api/inventory/:id
// @access  Private (Hospital only)
export const deleteInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.findById(req.params.id);

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: 'Inventory not found',
      });
    }

    if (inventory.hospital.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this inventory',
      });
    }

    await inventory.deleteOne();

    res.json({
      success: true,
      message: 'Inventory deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};