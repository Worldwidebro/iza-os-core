# Data & Datasets

Central data lake for AI training, RAG, and monetization within the IZA OS ecosystem.

## IZA OS Integration

This project provides:
- **Centralized Data Lake**: Unified storage for all IZA OS data assets
- **ETL Pipelines**: Automated data processing and transformation workflows
- **Export Systems**: Integration with Apple Notes, Obsidian, Jupyter, and GitHub repos
- **Monetization Data**: Structured data for revenue generation and business intelligence

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                Data & Datasets Hub                         │
├─────────────────────────────────────────────────────────────┤
│  Structured Datasets                                        │
│  ├── Business Intelligence Data                            │
│  ├── Market Research Data                                  │
│  ├── Financial Data                                        │
│  └── User Behavior Data                                   │
├─────────────────────────────────────────────────────────────┤
│  Unstructured Datasets                                      │
│  ├── Text Documents                                        │
│  ├── Images & Media                                        │
│  ├── Audio & Video                                          │
│  └── Web Scraped Content                                  │
├─────────────────────────────────────────────────────────────┤
│  ETL Pipelines                                             │
│  ├── Data Ingestion                                        │
│  ├── Data Transformation                                   │
│  ├── Data Validation                                       │
│  └── Data Loading                                          │
├─────────────────────────────────────────────────────────────┤
│  Export Systems                                            │
│  ├── Apple Notes Export                                    │
│  ├── Obsidian Sync                                         │
│  ├── Jupyter Notebooks                                     │
│  └── GitHub Repository Sync                              │
├─────────────────────────────────────────────────────────────┤
│  Embeddings & Vector Data                                   │
│  ├── Text Embeddings                                       │
│  ├── Image Embeddings                                      │
│  ├── Audio Embeddings                                      │
│  └── Multimodal Embeddings                                │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Structured Datasets (`datasets/`)

#### Business Intelligence Data
- **Revenue Data**: Monthly/yearly revenue breakdowns
- **User Metrics**: Active users, engagement, retention
- **Performance Metrics**: System performance, response times
- **Cost Analysis**: Infrastructure costs, operational expenses

#### Market Research Data
- **Competitor Analysis**: Market positioning, pricing strategies
- **Industry Trends**: Market growth, technology adoption
- **Customer Insights**: Demographics, preferences, behavior
- **Investment Data**: Funding rounds, valuations, exits

#### Financial Data
- **Trading Data**: Stock prices, crypto prices, forex rates
- **Portfolio Data**: Holdings, performance, risk metrics
- **Economic Indicators**: GDP, inflation, interest rates
- **Company Financials**: Revenue, profit, cash flow

### 2. Unstructured Datasets (`datasets/`)

#### Text Documents
- **Research Papers**: Academic papers, whitepapers
- **News Articles**: Industry news, company updates
- **Social Media**: Posts, comments, reviews
- **Documentation**: Technical docs, user guides

#### Images & Media
- **Product Images**: E-commerce product photos
- **Infographics**: Data visualizations, charts
- **Marketing Materials**: Advertisements, banners
- **User Generated Content**: Photos, videos, memes

### 3. ETL Pipelines (`pipelines/`)

#### Data Ingestion
- **API Ingestion**: REST APIs, GraphQL, webhooks
- **File Ingestion**: CSV, JSON, XML, Parquet
- **Database Ingestion**: SQL databases, NoSQL databases
- **Stream Ingestion**: Real-time data streams

#### Data Transformation
- **Data Cleaning**: Remove duplicates, handle missing values
- **Data Normalization**: Standardize formats, units
- **Data Enrichment**: Add metadata, classifications
- **Data Aggregation**: Summarize, group, calculate metrics

### 4. Export Systems (`exports/`)

#### Apple Notes Export
- **Automated Export**: Scheduled exports from Apple Notes
- **Format Conversion**: Convert to Markdown, JSON
- **Metadata Extraction**: Tags, creation dates, modifications
- **Content Processing**: Clean formatting, extract links

#### Obsidian Sync
- **Vault Synchronization**: Sync Obsidian vault to IZA OS
- **Link Processing**: Process internal links, references
- **Graph Analysis**: Analyze knowledge graph connections
- **Content Indexing**: Index for search and retrieval

## IZA OS Ecosystem Integration

### Data Pipeline Integration
```python
# pipelines/iza-os-data-pipeline.py
import asyncio
import pandas as pd
from typing import Dict, List, Any
from dataclasses import dataclass
from datetime import datetime

@dataclass
class IZAOSDataPoint:
    """IZA OS data point structure"""
    timestamp: datetime
    source: str
    data_type: str
    content: Any
    metadata: Dict[str, Any]
    embeddings: List[float] = None

class IZAOSDataPipeline:
    def __init__(self):
        self.rag_pipeline = RAGPipeline()
        self.vector_db = ChromaDB()
        self.knowledge_base = KnowledgeBase()
        self.monitoring = IZAOSMonitoring()
        
    async def ingest_data(self, data_source: str, data: Any) -> IZAOSDataPoint:
        """Ingest data into IZA OS pipeline"""
        
        # Create data point
        data_point = IZAOSDataPoint(
            timestamp=datetime.now(),
            source=data_source,
            data_type=type(data).__name__,
            content=data,
            metadata={}
        )
        
        # Process through RAG pipeline
        if isinstance(data, str):
            embeddings = await self.rag_pipeline.generate_embeddings(data)
            data_point.embeddings = embeddings
            
        # Store in vector database
        await self.vector_db.store_data_point(data_point)
        
        # Update knowledge base
        await self.knowledge_base.add_data_point(data_point)
        
        # Update monitoring
        await self.monitoring.record_data_ingestion(data_point)
        
        return data_point
    
    async def process_batch_data(self, data_batch: List[Any]) -> List[IZAOSDataPoint]:
        """Process batch of data points"""
        tasks = []
        
        for data in data_batch:
            task = asyncio.create_task(self.ingest_data("batch", data))
            tasks.append(task)
            
        return await asyncio.gather(*tasks)
    
    async def export_data(self, data_points: List[IZAOSDataPoint], 
                         export_format: str) -> str:
        """Export data in specified format"""
        
        if export_format == "json":
            return self._export_to_json(data_points)
        elif export_format == "csv":
            return self._export_to_csv(data_points)
        elif export_format == "markdown":
            return self._export_to_markdown(data_points)
        else:
            raise ValueError(f"Unsupported export format: {export_format}")
    
    def _export_to_json(self, data_points: List[IZAOSDataPoint]) -> str:
        """Export data points to JSON"""
        export_data = []
        
        for dp in data_points:
            export_data.append({
                "timestamp": dp.timestamp.isoformat(),
                "source": dp.source,
                "data_type": dp.data_type,
                "content": dp.content,
                "metadata": dp.metadata,
                "embeddings": dp.embeddings
            })
            
        return json.dumps(export_data, indent=2)
    
    def _export_to_csv(self, data_points: List[IZAOSDataPoint]) -> str:
        """Export data points to CSV"""
        df_data = []
        
        for dp in data_points:
            df_data.append({
                "timestamp": dp.timestamp,
                "source": dp.source,
                "data_type": dp.data_type,
                "content": str(dp.content),
                "metadata": json.dumps(dp.metadata)
            })
            
        df = pd.DataFrame(df_data)
        return df.to_csv(index=False)
    
    def _export_to_markdown(self, data_points: List[IZAOSDataPoint]) -> str:
        """Export data points to Markdown"""
        markdown_content = []
        
        for dp in data_points:
            markdown_content.append(f"## {dp.data_type} - {dp.timestamp}")
            markdown_content.append(f"**Source:** {dp.source}")
            markdown_content.append(f"**Content:** {dp.content}")
            markdown_content.append(f"**Metadata:** {json.dumps(dp.metadata, indent=2)}")
            markdown_content.append("---")
            
        return "\n".join(markdown_content)
```

### Apple Notes Integration
```python
# exports/apple_notes_export.py
import subprocess
import json
import os
from datetime import datetime
from typing import List, Dict, Any

class AppleNotesExporter:
    def __init__(self):
        self.export_path = "exports/apple_notes"
        self.iza_os_pipeline = IZAOSDataPipeline()
        
    async def export_notes(self) -> List[Dict[str, Any]]:
        """Export all Apple Notes"""
        
        # Use AppleScript to export notes
        applescript = '''
        tell application "Notes"
            set notesList to {}
            repeat with note in notes
                set noteData to {name:name of note, body:body of note, creation_date:creation date of note, modification_date:modification date of note}
                set end of notesList to noteData
            end repeat
            return notesList
        end tell
        '''
        
        # Execute AppleScript
        result = subprocess.run(['osascript', '-e', applescript], 
                              capture_output=True, text=True)
        
        if result.returncode != 0:
            raise Exception(f"AppleScript failed: {result.stderr}")
        
        # Parse result
        notes_data = json.loads(result.stdout)
        
        # Process each note through IZA OS pipeline
        processed_notes = []
        for note in notes_data:
            processed_note = await self._process_note(note)
            processed_notes.append(processed_note)
            
        return processed_notes
    
    async def _process_note(self, note: Dict[str, Any]) -> Dict[str, Any]:
        """Process individual note"""
        
        # Clean content
        content = self._clean_note_content(note['body'])
        
        # Extract metadata
        metadata = {
            'title': note['name'],
            'creation_date': note['creation_date'],
            'modification_date': note['modification_date'],
            'source': 'apple_notes',
            'word_count': len(content.split()),
            'character_count': len(content)
        }
        
        # Process through IZA OS pipeline
        data_point = await self.iza_os_pipeline.ingest_data("apple_notes", content)
        
        return {
            'original_note': note,
            'processed_content': content,
            'metadata': metadata,
            'data_point_id': data_point.id
        }
    
    def _clean_note_content(self, content: str) -> str:
        """Clean note content"""
        # Remove extra whitespace
        content = ' '.join(content.split())
        
        # Remove Apple Notes specific formatting
        content = content.replace('\ufeff', '')  # Remove BOM
        
        return content
    
    async def export_to_markdown(self, notes: List[Dict[str, Any]]) -> str:
        """Export notes to Markdown format"""
        markdown_content = []
        
        for note in notes:
            metadata = note['metadata']
            content = note['processed_content']
            
            markdown_content.append(f"# {metadata['title']}")
            markdown_content.append(f"**Created:** {metadata['creation_date']}")
            markdown_content.append(f"**Modified:** {metadata['modification_date']}")
            markdown_content.append(f"**Words:** {metadata['word_count']}")
            markdown_content.append("")
            markdown_content.append(content)
            markdown_content.append("")
            markdown_content.append("---")
            markdown_content.append("")
            
        return "\n".join(markdown_content)
```

### Obsidian Sync Integration
```python
# exports/obsidian_sync.py
import os
import shutil
import json
from pathlib import Path
from typing import List, Dict, Any
import asyncio

class ObsidianSync:
    def __init__(self, vault_path: str):
        self.vault_path = Path(vault_path)
        self.sync_path = Path("exports/obsidian")
        self.iza_os_pipeline = IZAOSDataPipeline()
        
    async def sync_vault(self) -> Dict[str, Any]:
        """Sync Obsidian vault to IZA OS"""
        
        # Create sync directory
        self.sync_path.mkdir(parents=True, exist_ok=True)
        
        # Sync all markdown files
        markdown_files = list(self.vault_path.glob("**/*.md"))
        
        sync_results = {
            'total_files': len(markdown_files),
            'synced_files': 0,
            'processed_files': 0,
            'errors': []
        }
        
        for md_file in markdown_files:
            try:
                await self._sync_file(md_file)
                sync_results['synced_files'] += 1
                
                # Process through IZA OS pipeline
                await self._process_file(md_file)
                sync_results['processed_files'] += 1
                
            except Exception as e:
                sync_results['errors'].append({
                    'file': str(md_file),
                    'error': str(e)
                })
        
        return sync_results
    
    async def _sync_file(self, md_file: Path):
        """Sync individual markdown file"""
        
        # Calculate relative path
        relative_path = md_file.relative_to(self.vault_path)
        sync_file_path = self.sync_path / relative_path
        
        # Create directory if needed
        sync_file_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Copy file
        shutil.copy2(md_file, sync_file_path)
        
        # Process links
        await self._process_links(sync_file_path)
    
    async def _process_links(self, file_path: Path):
        """Process internal links in markdown file"""
        
        content = file_path.read_text(encoding='utf-8')
        
        # Process internal links [[link]]
        import re
        internal_links = re.findall(r'\[\[([^\]]+)\]\]', content)
        
        # Update links to point to synced files
        for link in internal_links:
            # Convert to relative path
            link_path = Path(link)
            if link_path.suffix == '':
                link_path = link_path.with_suffix('.md')
            
            # Update link
            new_link = f"[[{link_path}]]"
            content = content.replace(f"[[{link}]]", new_link)
        
        # Write updated content
        file_path.write_text(content, encoding='utf-8')
    
    async def _process_file(self, md_file: Path):
        """Process file through IZA OS pipeline"""
        
        content = md_file.read_text(encoding='utf-8')
        
        # Extract metadata
        metadata = {
            'file_path': str(md_file),
            'file_name': md_file.name,
            'file_size': md_file.stat().st_size,
            'source': 'obsidian',
            'word_count': len(content.split()),
            'character_count': len(content)
        }
        
        # Process through IZA OS pipeline
        await self.iza_os_pipeline.ingest_data("obsidian", content)
    
    async def analyze_vault_graph(self) -> Dict[str, Any]:
        """Analyze Obsidian vault knowledge graph"""
        
        # Find all markdown files
        markdown_files = list(self.vault_path.glob("**/*.md"))
        
        graph_data = {
            'nodes': [],
            'edges': [],
            'statistics': {
                'total_files': len(markdown_files),
                'total_links': 0,
                'orphan_files': 0
            }
        }
        
        # Process each file
        for md_file in markdown_files:
            content = md_file.read_text(encoding='utf-8')
            
            # Add node
            node_id = str(md_file.relative_to(self.vault_path))
            graph_data['nodes'].append({
                'id': node_id,
                'label': md_file.stem,
                'size': md_file.stat().st_size
            })
            
            # Find links
            import re
            links = re.findall(r'\[\[([^\]]+)\]\]', content)
            
            for link in links:
                link_path = Path(link)
                if link_path.suffix == '':
                    link_path = link_path.with_suffix('.md')
                
                # Add edge
                graph_data['edges'].append({
                    'source': node_id,
                    'target': str(link_path)
                })
                
                graph_data['statistics']['total_links'] += 1
        
        return graph_data
```

### Jupyter Integration
```python
# exports/jupyter_integration.py
import nbformat
import json
from pathlib import Path
from typing import List, Dict, Any
import asyncio

class JupyterIntegration:
    def __init__(self, notebooks_path: str):
        self.notebooks_path = Path(notebooks_path)
        self.iza_os_pipeline = IZAOSDataPipeline()
        
    async def process_notebooks(self) -> List[Dict[str, Any]]:
        """Process all Jupyter notebooks"""
        
        notebook_files = list(self.notebooks_path.glob("**/*.ipynb"))
        
        processed_notebooks = []
        
        for notebook_file in notebook_files:
            try:
                processed_notebook = await self._process_notebook(notebook_file)
                processed_notebooks.append(processed_notebook)
            except Exception as e:
                print(f"Error processing {notebook_file}: {e}")
        
        return processed_notebooks
    
    async def _process_notebook(self, notebook_file: Path) -> Dict[str, Any]:
        """Process individual notebook"""
        
        # Read notebook
        with open(notebook_file, 'r', encoding='utf-8') as f:
            notebook = nbformat.read(f, as_version=4)
        
        # Extract content
        content = self._extract_notebook_content(notebook)
        
        # Extract metadata
        metadata = {
            'file_path': str(notebook_file),
            'file_name': notebook_file.name,
            'cell_count': len(notebook.cells),
            'code_cells': len([cell for cell in notebook.cells if cell.cell_type == 'code']),
            'markdown_cells': len([cell for cell in notebook.cells if cell.cell_type == 'markdown']),
            'source': 'jupyter'
        }
        
        # Process through IZA OS pipeline
        data_point = await self.iza_os_pipeline.ingest_data("jupyter", content)
        
        return {
            'notebook_file': str(notebook_file),
            'content': content,
            'metadata': metadata,
            'data_point_id': data_point.id
        }
    
    def _extract_notebook_content(self, notebook) -> str:
        """Extract content from notebook"""
        content_parts = []
        
        for cell in notebook.cells:
            if cell.cell_type == 'markdown':
                content_parts.append(f"# {cell.source}")
            elif cell.cell_type == 'code':
                content_parts.append(f"```python\n{cell.source}\n```")
            elif cell.cell_type == 'raw':
                content_parts.append(cell.source)
        
        return "\n\n".join(content_parts)
    
    async def export_to_markdown(self, notebooks: List[Dict[str, Any]]) -> str:
        """Export notebooks to Markdown format"""
        markdown_content = []
        
        for notebook in notebooks:
            metadata = notebook['metadata']
            content = notebook['content']
            
            markdown_content.append(f"# {metadata['file_name']}")
            markdown_content.append(f"**Cells:** {metadata['cell_count']}")
            markdown_content.append(f"**Code Cells:** {metadata['code_cells']}")
            markdown_content.append(f"**Markdown Cells:** {metadata['markdown_cells']}")
            markdown_content.append("")
            markdown_content.append(content)
            markdown_content.append("")
            markdown_content.append("---")
            markdown_content.append("")
            
        return "\n".join(markdown_content)
```

## Data Quality & Validation

### Data Validation Pipeline
```python
# pipelines/data_validation.py
from typing import Dict, List, Any, Optional
import pandas as pd
import numpy as np
from datetime import datetime

class DataValidator:
    def __init__(self):
        self.validation_rules = self._load_validation_rules()
        
    def validate_data_point(self, data_point: IZAOSDataPoint) -> Dict[str, Any]:
        """Validate individual data point"""
        
        validation_result = {
            'is_valid': True,
            'errors': [],
            'warnings': [],
            'quality_score': 100
        }
        
        # Validate timestamp
        if not isinstance(data_point.timestamp, datetime):
            validation_result['errors'].append("Invalid timestamp format")
            validation_result['is_valid'] = False
        
        # Validate source
        if not data_point.source or len(data_point.source) == 0:
            validation_result['errors'].append("Source is required")
            validation_result['is_valid'] = False
        
        # Validate content
        if not data_point.content:
            validation_result['errors'].append("Content is required")
            validation_result['is_valid'] = False
        
        # Validate data type specific rules
        if data_point.data_type == 'str':
            validation_result = self._validate_text_content(data_point, validation_result)
        elif data_point.data_type == 'dict':
            validation_result = self._validate_dict_content(data_point, validation_result)
        
        # Calculate quality score
        validation_result['quality_score'] = self._calculate_quality_score(validation_result)
        
        return validation_result
    
    def _validate_text_content(self, data_point: IZAOSDataPoint, 
                              validation_result: Dict[str, Any]) -> Dict[str, Any]:
        """Validate text content"""
        
        content = str(data_point.content)
        
        # Check minimum length
        if len(content) < 10:
            validation_result['warnings'].append("Content is very short")
            validation_result['quality_score'] -= 10
        
        # Check for encoding issues
        try:
            content.encode('utf-8')
        except UnicodeEncodeError:
            validation_result['errors'].append("Content has encoding issues")
            validation_result['is_valid'] = False
        
        # Check for spam patterns
        spam_patterns = ['spam', 'advertisement', 'click here']
        if any(pattern in content.lower() for pattern in spam_patterns):
            validation_result['warnings'].append("Content may be spam")
            validation_result['quality_score'] -= 20
        
        return validation_result
    
    def _validate_dict_content(self, data_point: IZAOSDataPoint, 
                              validation_result: Dict[str, Any]) -> Dict[str, Any]:
        """Validate dictionary content"""
        
        content = data_point.content
        
        if not isinstance(content, dict):
            validation_result['errors'].append("Content is not a dictionary")
            validation_result['is_valid'] = False
            return validation_result
        
        # Check for required fields
        required_fields = ['id', 'timestamp', 'data']
        for field in required_fields:
            if field not in content:
                validation_result['warnings'].append(f"Missing field: {field}")
                validation_result['quality_score'] -= 5
        
        return validation_result
    
    def _calculate_quality_score(self, validation_result: Dict[str, Any]) -> int:
        """Calculate data quality score"""
        
        base_score = 100
        
        # Deduct for errors
        base_score -= len(validation_result['errors']) * 20
        
        # Deduct for warnings
        base_score -= len(validation_result['warnings']) * 5
        
        return max(0, base_score)
    
    def _load_validation_rules(self) -> Dict[str, Any]:
        """Load validation rules"""
        return {
            'text': {
                'min_length': 10,
                'max_length': 1000000,
                'required_encoding': 'utf-8'
            },
            'dict': {
                'required_fields': ['id', 'timestamp', 'data'],
                'max_depth': 10
            },
            'image': {
                'max_size': 10 * 1024 * 1024,  # 10MB
                'allowed_formats': ['jpg', 'jpeg', 'png', 'gif', 'webp']
            }
        }
```

## Monetization Data

### Revenue Data Pipeline
```python
# datasets/revenue_pipeline.py
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, List, Any
import asyncio

class RevenueDataPipeline:
    def __init__(self):
        self.iza_os_pipeline = IZAOSDataPipeline()
        
    async def generate_revenue_data(self) -> Dict[str, Any]:
        """Generate IZA OS revenue data"""
        
        # Calculate ecosystem value
        ecosystem_value = 10247500000  # $10.2B+
        
        # Generate revenue projections
        revenue_data = {
            'ecosystem_value': ecosystem_value,
            'revenue_projections': {
                'year_1': 50000000,   # $50M
                'year_5': 500000000,  # $500M
                'year_10': 2000000000  # $2B
            },
            'revenue_streams': {
                'ai_services': 0.4,      # 40%
                'automation_solutions': 0.3,  # 30%
                'content_creation': 0.2,      # 20%
                'data_services': 0.1          # 10%
            },
            'cost_structure': {
                'infrastructure': 0.2,   # 20%
                'personnel': 0.4,        # 40%
                'marketing': 0.2,        # 20%
                'research': 0.2          # 20%
            }
        }
        
        # Process through IZA OS pipeline
        await self.iza_os_pipeline.ingest_data("revenue", revenue_data)
        
        return revenue_data
    
    async def generate_market_data(self) -> Dict[str, Any]:
        """Generate market research data"""
        
        market_data = {
            'market_size': {
                'ai_market': 1800000000000,  # $1.8T by 2030
                'automation_market': 214000000000,  # $214B by 2030
                'content_creation_market': 104000000000,  # $104B by 2030
                'database_market': 63000000000  # $63B by 2030
            },
            'competitive_analysis': {
                'openai': 80000000000,  # $80B+
                'anthropic': 18000000000,  # $18B+
                'hugging_face': 4500000000,  # $4.5B+
                'scale_ai': 7300000000,  # $7.3B+
                'databricks': 43000000000  # $43B+
            },
            'market_trends': {
                'ai_adoption_rate': 0.35,  # 35% annual growth
                'automation_adoption': 0.25,  # 25% annual growth
                'content_automation': 0.30,  # 30% annual growth
                'data_intelligence': 0.20  # 20% annual growth
            }
        }
        
        # Process through IZA OS pipeline
        await self.iza_os_pipeline.ingest_data("market_research", market_data)
        
        return market_data
```

## Success Metrics

- **Data Quality Score**: >95% data validation success rate
- **Processing Speed**: <5 seconds for 1000 data points
- **Export Success Rate**: >99% successful exports
- **Data Freshness**: <1 hour data latency
- **Storage Efficiency**: >90% compression ratio
- **Integration Success**: 100% successful IZA OS integration
