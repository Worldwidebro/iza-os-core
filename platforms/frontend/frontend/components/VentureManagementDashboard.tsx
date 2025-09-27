import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  LinearProgress,
  Alert,
  IconButton,
  Tooltip,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  Assessment as AnalyticsIcon,
  Refresh as RefreshIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

// Types
interface Venture {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  stage: 'IDEA' | 'MVP' | 'GROWTH' | 'SCALE' | 'EXIT';
  status: 'ACTIVE' | 'INACTIVE' | 'ACQUIRED' | 'FAILED';
  valuation?: number;
  funding?: number;
  team_size?: number;
  founders: string[];
  created_at: string;
  updated_at: string;
  metrics: Record<string, any>;
}

interface VentureAnalytics {
  total_ventures: number;
  total_valuation: number;
  total_funding: number;
  stage_distribution: Record<string, number>;
  industry_distribution: Record<string, number>;
  growth_metrics: {
    avg_valuation: number;
    avg_funding: number;
    portfolio_diversity: number;
    stage_progression: Record<string, number>;
  };
  top_performers: Array<{
    name: string;
    valuation: number;
    funding: number;
    stage: string;
  }>;
}

interface VentureCreateRequest {
  name: string;
  description?: string;
  industry?: string;
  stage: string;
  initial_funding?: number;
  team_size?: number;
  founders: string[];
}

const VentureManagementDashboard: React.FC = () => {
  // State management
  const [ventures, setVentures] = useState<Venture[]>([]);
  const [analytics, setAnalytics] = useState<VentureAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination and filters
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [stageFilter, setStageFilter] = useState<string>('');
  const [industryFilter, setIndustryFilter] = useState<string>('');
  
  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedVenture, setSelectedVenture] = useState<Venture | null>(null);
  
  // Form states
  const [createForm, setCreateForm] = useState<VentureCreateRequest>({
    name: '',
    description: '',
    industry: '',
    stage: 'IDEA',
    initial_funding: 0,
    team_size: 1,
    founders: [],
  });
  
  const [editForm, setEditForm] = useState<Partial<Venture>>({});
  
  // API Configuration
  const API_BASE = 'http://localhost:3000';
  const API_KEY = 'your-api-key'; // In production, get from auth context

  // Utility functions
  const formatCurrency = (amount?: number) => {
    if (!amount) return 'Not set';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStageColor = (stage: string) => {
    const colors = {
      IDEA: 'default',
      MVP: 'primary',
      GROWTH: 'secondary',
      SCALE: 'success',
      EXIT: 'warning',
    };
    return colors[stage as keyof typeof colors] || 'default';
  };

  const getStageIcon = (stage: string) => {
    const icons = {
      IDEA: '💡',
      MVP: '🔨',
      GROWTH: '📈',
      SCALE: '🚀',
      EXIT: '🎯',
    };
    return icons[stage as keyof typeof icons] || '📊';
  };

  // API functions
  const fetchVentures = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (stageFilter) params.append('stage', stageFilter);
      if (industryFilter) params.append('industry', industryFilter);

      const response = await fetch(`${API_BASE}/ventures?${params}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setVentures(data.ventures);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ventures');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_BASE}/ventures/analytics/overview`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    }
  };

  const createVenture = async (ventureData: VentureCreateRequest) => {
    try {
      const response = await fetch(`${API_BASE}/ventures`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ventureData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchVentures();
      await fetchAnalytics();
      setCreateDialogOpen(false);
      setCreateForm({
        name: '',
        description: '',
        industry: '',
        stage: 'IDEA',
        initial_funding: 0,
        team_size: 1,
        founders: [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create venture');
    }
  };

  const updateVenture = async (ventureId: string, updateData: Partial<Venture>) => {
    try {
      const response = await fetch(`${API_BASE}/ventures/${ventureId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchVentures();
      await fetchAnalytics();
      setEditDialogOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update venture');
    }
  };

  const deleteVenture = async (ventureId: string) => {
    try {
      const response = await fetch(`${API_BASE}/ventures/${ventureId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchVentures();
      await fetchAnalytics();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete venture');
    }
  };

  // Event handlers
  const handleCreateSubmit = () => {
    createVenture(createForm);
  };

  const handleEditSubmit = () => {
    if (selectedVenture) {
      updateVenture(selectedVenture.id, editForm);
    }
  };

  const handleEditClick = (venture: Venture) => {
    setSelectedVenture(venture);
    setEditForm({
      name: venture.name,
      description: venture.description,
      industry: venture.industry,
      stage: venture.stage,
      valuation: venture.valuation,
      funding: venture.funding,
      team_size: venture.team_size,
      founders: venture.founders,
    });
    setEditDialogOpen(true);
  };

  const handleViewClick = (venture: Venture) => {
    setSelectedVenture(venture);
    setViewDialogOpen(true);
  };

  const handleDeleteClick = (venture: Venture) => {
    if (window.confirm(`Are you sure you want to delete "${venture.name}"?`)) {
      deleteVenture(venture.id);
    }
  };

  const handleRefresh = () => {
    fetchVentures();
    fetchAnalytics();
  };

  // Effects
  useEffect(() => {
    fetchVentures();
    fetchAnalytics();
  }, [page, stageFilter, industryFilter]);

  // Render functions
  const renderAnalyticsCards = () => {
    if (!analytics) return null;

    return (
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <BusinessIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {analytics.total_ventures}
                  </Typography>
                  <Typography color="text.secondary">
                    Total Ventures
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <MoneyIcon color="success" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {formatCurrency(analytics.total_valuation)}
                  </Typography>
                  <Typography color="text.secondary">
                    Total Valuation
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <TrendingUpIcon color="info" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {formatCurrency(analytics.total_funding)}
                  </Typography>
                  <Typography color="text.secondary">
                    Total Funding
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <AnalyticsIcon color="warning" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {analytics.growth_metrics.portfolio_diversity}
                  </Typography>
                  <Typography color="text.secondary">
                    Industries
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const renderStageDistribution = () => {
    if (!analytics) return null;

    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Stage Distribution
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(analytics.stage_distribution).map(([stage, count]) => (
              <Grid item xs={12} sm={6} md={2.4} key={stage}>
                <Box textAlign="center">
                  <Typography variant="h4" component="div">
                    {getStageIcon(stage)}
                  </Typography>
                  <Typography variant="h6">
                    {count}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stage}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(count / analytics.total_ventures) * 100}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  };

  const renderVenturesTable = () => {
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Ventures Portfolio
            </Typography>
            <Box display="flex" gap={1}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Stage</InputLabel>
                <Select
                  value={stageFilter}
                  label="Stage"
                  onChange={(e) => setStageFilter(e.target.value)}
                >
                  <MenuItem value="">All Stages</MenuItem>
                  <MenuItem value="IDEA">Idea</MenuItem>
                  <MenuItem value="MVP">MVP</MenuItem>
                  <MenuItem value="GROWTH">Growth</MenuItem>
                  <MenuItem value="SCALE">Scale</MenuItem>
                  <MenuItem value="EXIT">Exit</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Industry</InputLabel>
                <Select
                  value={industryFilter}
                  label="Industry"
                  onChange={(e) => setIndustryFilter(e.target.value)}
                >
                  <MenuItem value="">All Industries</MenuItem>
                  {analytics && Object.keys(analytics.industry_distribution).map(industry => (
                    <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Tooltip title="Refresh">
                <IconButton onClick={handleRefresh}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {loading && <LinearProgress />}

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Stage</TableCell>
                  <TableCell>Industry</TableCell>
                  <TableCell>Valuation</TableCell>
                  <TableCell>Funding</TableCell>
                  <TableCell>Team Size</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ventures.map((venture) => (
                  <TableRow key={venture.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          {venture.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">
                            {venture.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {venture.description?.substring(0, 50)}...
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${getStageIcon(venture.stage)} ${venture.stage}`}
                        color={getStageColor(venture.stage) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {venture.industry || 'Not specified'}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(venture.valuation)}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(venture.funding)}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <PeopleIcon sx={{ mr: 1, fontSize: 16 }} />
                        {venture.team_size || 'Not set'}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewClick(venture)}
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleEditClick(venture)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteClick(venture)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {total > limit && (
            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={Math.ceil(total / limit)}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                color="primary"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderCreateDialog = () => {
    return (
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Venture</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Venture Name"
                value={createForm.name}
                onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={createForm.description}
                onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Industry"
                value={createForm.industry}
                onChange={(e) => setCreateForm({ ...createForm, industry: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Stage</InputLabel>
                <Select
                  value={createForm.stage}
                  label="Stage"
                  onChange={(e) => setCreateForm({ ...createForm, stage: e.target.value })}
                >
                  <MenuItem value="IDEA">Idea</MenuItem>
                  <MenuItem value="MVP">MVP</MenuItem>
                  <MenuItem value="GROWTH">Growth</MenuItem>
                  <MenuItem value="SCALE">Scale</MenuItem>
                  <MenuItem value="EXIT">Exit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Initial Funding"
                type="number"
                value={createForm.initial_funding}
                onChange={(e) => setCreateForm({ ...createForm, initial_funding: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Team Size"
                type="number"
                value={createForm.team_size}
                onChange={(e) => setCreateForm({ ...createForm, team_size: Number(e.target.value) })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateSubmit} variant="contained">
            Create Venture
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderViewDialog = () => {
    if (!selectedVenture) return null;

    return (
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
              {selectedVenture.name.charAt(0)}
            </Avatar>
            {selectedVenture.name}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Description:</strong> {selectedVenture.description || 'No description provided'}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Industry:</strong> {selectedVenture.industry || 'Not specified'}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Stage:</strong> {getStageIcon(selectedVenture.stage)} {selectedVenture.stage}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Status:</strong> {selectedVenture.status}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Financial Information
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Valuation:</strong> {formatCurrency(selectedVenture.valuation)}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Funding Raised:</strong> {formatCurrency(selectedVenture.funding)}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Team Information
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Team Size:</strong> {selectedVenture.team_size || 'Not specified'}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Founders:</strong> {selectedVenture.founders.join(', ') || 'Not specified'}
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Timeline
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Created:</strong> {new Date(selectedVenture.created_at).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Last Updated:</strong> {new Date(selectedVenture.updated_at).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          🚀 Venture Portfolio Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateDialogOpen(true)}
        >
          Add Venture
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Analytics Cards */}
      {renderAnalyticsCards()}

      {/* Stage Distribution */}
      {renderStageDistribution()}

      {/* Ventures Table */}
      {renderVenturesTable()}

      {/* Dialogs */}
      {renderCreateDialog()}
      {renderViewDialog()}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={() => setCreateDialogOpen(true)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default VentureManagementDashboard;
