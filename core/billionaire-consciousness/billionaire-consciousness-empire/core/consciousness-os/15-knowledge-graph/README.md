# Knowledge Graph / Semantic Memory

Turn all notes, research, and repositories into a queryable semantic graph for Claude, Cursor, and Warp.

## IZA OS Integration

This project provides:
- **Semantic Memory**: Graph-based knowledge representation
- **Cross-Platform Sync**: Apple Notes → Obsidian → Knowledge Graph pipeline
- **Intelligent Queries**: Natural language queries across all knowledge
- **Context Awareness**: Dynamic context loading for AI agents

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                Knowledge Graph Hub                         │
├─────────────────────────────────────────────────────────────┤
│  Graph Schemas                                             │
│  ├── Entity Schemas (Person, Project, Concept)           │
│  ├── Relationship Schemas (Works_On, References, Contains)│
│  ├── Property Schemas (Metadata, Timestamps, Sources)     │
│  └── Query Schemas (Cypher, SPARQL, Natural Language)    │
├─────────────────────────────────────────────────────────────┤
│  Sync Pipelines                                            │
│  ├── Apple Notes → Graph                                  │
│  ├── Obsidian → Graph                                     │
│  ├── Jupyter → Graph                                      │
│  └── GitHub → Graph                                       │
├─────────────────────────────────────────────────────────────┤
│  Query Engine                                              │
│  ├── Natural Language Processing                          │
│  ├── Semantic Search                                      │
│  ├── Context Retrieval                                    │
│  └── Knowledge Synthesis                                   │
├─────────────────────────────────────────────────────────────┤
│  Graph Databases                                           │
│  ├── Neo4j (Primary Graph DB)                            │
│  ├── Memgraph (High Performance)                         │
│  ├── Weaviate (Vector + Graph)                           │
│  └── ChromaDB (Embeddings)                                │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Graph Schemas (`kg/`)

#### Entity Schemas
- **Person**: Authors, collaborators, users
- **Project**: Ventures, experiments, products
- **Concept**: Ideas, theories, methodologies
- **Resource**: Documents, code, data

#### Relationship Schemas
- **Works_On**: Person → Project relationships
- **References**: Document → Document citations
- **Contains**: Project → Resource containment
- **Influences**: Concept → Concept influence

### 2. Sync Pipelines (`sync/`)

#### Apple Notes Sync
- **Automated Export**: Daily Apple Notes export
- **Content Parsing**: Extract entities and relationships
- **Graph Population**: Insert into knowledge graph
- **Change Detection**: Track modifications and updates

#### Obsidian Sync
- **Vault Monitoring**: Real-time vault changes
- **Link Processing**: Process internal links and references
- **Graph Analysis**: Analyze knowledge graph connections
- **Bidirectional Sync**: Graph updates back to Obsidian

## IZA OS Ecosystem Integration

### Knowledge Graph Implementation
```python
# kg/knowledge_graph.py
from typing import Dict, List, Any, Optional
from datetime import datetime
import asyncio
from neo4j import GraphDatabase
import json

class IZAOSKnowledgeGraph:
    def __init__(self):
        self.neo4j_driver = GraphDatabase.driver("bolt://localhost:7687")
        self.sync_pipelines = SyncPipelines()
        self.query_engine = QueryEngine()
        self.iza_os_agents = IZAOSAgentManager()
        
    async def initialize_graph_schema(self) -> Dict[str, Any]:
        """Initialize knowledge graph schema"""
        
        schema_creation = {
            "timestamp": datetime.now().isoformat(),
            "schemas_created": [],
            "status": "initializing"
        }
        
        try:
            # Create entity schemas
            await self._create_entity_schemas()
            schema_creation["schemas_created"].append("entities")
            
            # Create relationship schemas
            await self._create_relationship_schemas()
            schema_creation["schemas_created"].append("relationships")
            
            # Create property schemas
            await self._create_property_schemas()
            schema_creation["schemas_created"].append("properties")
            
            # Create indexes
            await self._create_indexes()
            schema_creation["schemas_created"].append("indexes")
            
            schema_creation["status"] = "completed"
            
        except Exception as e:
            schema_creation["status"] = "failed"
            schema_creation["error"] = str(e)
        
        return schema_creation
    
    async def _create_entity_schemas(self):
        """Create entity schemas"""
        
        entity_schemas = {
            "Person": {
                "properties": {
                    "name": "string",
                    "email": "string",
                    "role": "string",
                    "created_at": "datetime",
                    "updated_at": "datetime"
                },
                "constraints": ["name", "email"]
            },
            "Project": {
                "properties": {
                    "title": "string",
                    "description": "string",
                    "status": "string",
                    "created_at": "datetime",
                    "updated_at": "datetime"
                },
                "constraints": ["title"]
            },
            "Concept": {
                "properties": {
                    "name": "string",
                    "definition": "string",
                    "category": "string",
                    "created_at": "datetime",
                    "updated_at": "datetime"
                },
                "constraints": ["name"]
            },
            "Resource": {
                "properties": {
                    "title": "string",
                    "type": "string",
                    "url": "string",
                    "content": "string",
                    "created_at": "datetime",
                    "updated_at": "datetime"
                },
                "constraints": ["title"]
            }
        }
        
        for entity_type, schema in entity_schemas.items():
            await self._create_entity_schema(entity_type, schema)
    
    async def _create_relationship_schemas(self):
        """Create relationship schemas"""
        
        relationship_schemas = {
            "WORKS_ON": {
                "from": "Person",
                "to": "Project",
                "properties": {
                    "role": "string",
                    "start_date": "datetime",
                    "end_date": "datetime"
                }
            },
            "REFERENCES": {
                "from": "Resource",
                "to": "Resource",
                "properties": {
                    "reference_type": "string",
                    "created_at": "datetime"
                }
            },
            "CONTAINS": {
                "from": "Project",
                "to": "Resource",
                "properties": {
                    "created_at": "datetime"
                }
            },
            "INFLUENCES": {
                "from": "Concept",
                "to": "Concept",
                "properties": {
                    "influence_type": "string",
                    "strength": "float",
                    "created_at": "datetime"
                }
            }
        }
        
        for rel_type, schema in relationship_schemas.items():
            await self._create_relationship_schema(rel_type, schema)
    
    async def sync_apple_notes(self, notes_data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Sync Apple Notes to knowledge graph"""
        
        sync_result = {
            "sync_id": f"apple_notes_{datetime.now().timestamp()}",
            "notes_processed": 0,
            "entities_created": 0,
            "relationships_created": 0,
            "status": "running",
            "start_time": datetime.now().isoformat()
        }
        
        try:
            for note in notes_data:
                # Extract entities from note
                entities = await self._extract_entities_from_note(note)
                
                # Create entities in graph
                for entity in entities:
                    await self._create_entity(entity)
                    sync_result["entities_created"] += 1
                
                # Extract relationships
                relationships = await self._extract_relationships_from_note(note)
                
                # Create relationships in graph
                for relationship in relationships:
                    await self._create_relationship(relationship)
                    sync_result["relationships_created"] += 1
                
                sync_result["notes_processed"] += 1
            
            sync_result["status"] = "completed"
            sync_result["end_time"] = datetime.now().isoformat()
            
        except Exception as e:
            sync_result["status"] = "failed"
            sync_result["error"] = str(e)
            sync_result["end_time"] = datetime.now().isoformat()
        
        return sync_result
    
    async def _extract_entities_from_note(self, note: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Extract entities from Apple Note"""
        
        entities = []
        
        # Create Resource entity for the note itself
        resource_entity = {
            "type": "Resource",
            "properties": {
                "title": note.get("title", "Untitled"),
                "type": "apple_note",
                "content": note.get("content", ""),
                "created_at": note.get("created_at", datetime.now().isoformat()),
                "updated_at": note.get("updated_at", datetime.now().isoformat())
            }
        }
        entities.append(resource_entity)
        
        # Extract person names (simple regex for now)
        import re
        person_names = re.findall(r'\b[A-Z][a-z]+ [A-Z][a-z]+\b', note.get("content", ""))
        
        for name in person_names:
            person_entity = {
                "type": "Person",
                "properties": {
                    "name": name,
                    "email": "",
                    "role": "unknown",
                    "created_at": datetime.now().isoformat(),
                    "updated_at": datetime.now().isoformat()
                }
            }
            entities.append(person_entity)
        
        # Extract project names (look for patterns like "Project X", "Task Y")
        project_patterns = re.findall(r'\b(?:Project|Task|Initiative|Venture)\s+([A-Z][a-zA-Z0-9]+)\b', note.get("content", ""))
        
        for project_name in project_patterns:
            project_entity = {
                "type": "Project",
                "properties": {
                    "title": project_name,
                    "description": f"Project mentioned in note: {note.get('title', '')}",
                    "status": "active",
                    "created_at": datetime.now().isoformat(),
                    "updated_at": datetime.now().isoformat()
                }
            }
            entities.append(project_entity)
        
        return entities
    
    async def _extract_relationships_from_note(self, note: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Extract relationships from Apple Note"""
        
        relationships = []
        
        # Create CONTAINS relationship between note and any projects mentioned
        import re
        project_patterns = re.findall(r'\b(?:Project|Task|Initiative|Venture)\s+([A-Z][a-zA-Z0-9]+)\b', note.get("content", ""))
        
        for project_name in project_patterns:
            relationship = {
                "type": "CONTAINS",
                "from": {
                    "type": "Project",
                    "properties": {"title": project_name}
                },
                "to": {
                    "type": "Resource",
                    "properties": {"title": note.get("title", "Untitled")}
                },
                "properties": {
                    "created_at": datetime.now().isoformat()
                }
            }
            relationships.append(relationship)
        
        return relationships
    
    async def query_knowledge_graph(self, query: str, 
                                  query_type: str = "natural_language") -> Dict[str, Any]:
        """Query knowledge graph"""
        
        query_result = {
            "query": query,
            "query_type": query_type,
            "timestamp": datetime.now().isoformat(),
            "results": [],
            "execution_time": 0
        }
        
        start_time = datetime.now()
        
        try:
            if query_type == "natural_language":
                # Convert natural language to Cypher
                cypher_query = await self.query_engine.natural_language_to_cypher(query)
                results = await self._execute_cypher_query(cypher_query)
            elif query_type == "cypher":
                results = await self._execute_cypher_query(query)
            elif query_type == "semantic_search":
                results = await self._semantic_search(query)
            else:
                raise ValueError(f"Unknown query type: {query_type}")
            
            query_result["results"] = results
            
        except Exception as e:
            query_result["error"] = str(e)
        
        query_result["execution_time"] = (datetime.now() - start_time).total_seconds()
        
        return query_result
    
    async def _execute_cypher_query(self, cypher_query: str) -> List[Dict[str, Any]]:
        """Execute Cypher query"""
        
        with self.neo4j_driver.session() as session:
            result = session.run(cypher_query)
            return [record.data() for record in result]
    
    async def _semantic_search(self, query: str) -> List[Dict[str, Any]]:
        """Perform semantic search"""
        
        # This would typically use vector embeddings
        # For now, return mock results
        
        return [
            {
                "entity": "Project",
                "title": "IZA OS Development",
                "relevance_score": 0.95,
                "content": "Main development project for IZA OS ecosystem"
            },
            {
                "entity": "Concept",
                "title": "AI Agent Orchestration",
                "relevance_score": 0.87,
                "content": "Concept of coordinating multiple AI agents"
            }
        ]
    
    async def get_context_for_agent(self, agent_id: str, 
                                  context_type: str) -> Dict[str, Any]:
        """Get relevant context for AI agent"""
        
        context = {
            "agent_id": agent_id,
            "context_type": context_type,
            "timestamp": datetime.now().isoformat(),
            "entities": [],
            "relationships": [],
            "resources": []
        }
        
        # Get agent's current task
        agent_task = await self.iza_os_agents.get_agent_task(agent_id)
        
        if agent_task:
            # Query for relevant entities
            relevant_entities = await self._get_relevant_entities(agent_task)
            context["entities"] = relevant_entities
            
            # Query for relevant relationships
            relevant_relationships = await self._get_relevant_relationships(agent_task)
            context["relationships"] = relevant_relationships
            
            # Query for relevant resources
            relevant_resources = await self._get_relevant_resources(agent_task)
            context["resources"] = relevant_resources
        
        return context
    
    async def _get_relevant_entities(self, task: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Get entities relevant to task"""
        
        # This would typically use semantic similarity
        # For now, return mock results
        
        return [
            {
                "type": "Project",
                "title": "IZA OS Development",
                "relevance": 0.9
            },
            {
                "type": "Person",
                "name": "John Doe",
                "relevance": 0.7
            }
        ]
    
    async def _get_relevant_relationships(self, task: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Get relationships relevant to task"""
        
        return [
            {
                "type": "WORKS_ON",
                "from": "John Doe",
                "to": "IZA OS Development",
                "relevance": 0.8
            }
        ]
    
    async def _get_relevant_resources(self, task: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Get resources relevant to task"""
        
        return [
            {
                "title": "IZA OS Architecture Document",
                "type": "document",
                "relevance": 0.9
            },
            {
                "title": "API Documentation",
                "type": "document",
                "relevance": 0.8
            }
        ]
```

### Sync Pipeline Implementation
```python
# sync/sync_pipelines.py
from typing import Dict, List, Any, Optional
from datetime import datetime
import asyncio
import subprocess
import json
from pathlib import Path

class SyncPipelines:
    def __init__(self):
        self.knowledge_graph = IZAOSKnowledgeGraph()
        self.apple_notes_exporter = AppleNotesExporter()
        self.obsidian_sync = ObsidianSync()
        self.jupyter_sync = JupyterSync()
        
    async def run_full_sync(self) -> Dict[str, Any]:
        """Run full synchronization across all platforms"""
        
        sync_result = {
            "sync_id": f"full_sync_{datetime.now().timestamp()}",
            "start_time": datetime.now().isoformat(),
            "platforms": {},
            "overall_status": "running"
        }
        
        try:
            # Sync Apple Notes
            apple_notes_result = await self.sync_apple_notes()
            sync_result["platforms"]["apple_notes"] = apple_notes_result
            
            # Sync Obsidian
            obsidian_result = await self.sync_obsidian()
            sync_result["platforms"]["obsidian"] = obsidian_result
            
            # Sync Jupyter
            jupyter_result = await self.sync_jupyter()
            sync_result["platforms"]["jupyter"] = jupyter_result
            
            # Sync GitHub
            github_result = await self.sync_github()
            sync_result["platforms"]["github"] = github_result
            
            sync_result["overall_status"] = "completed"
            sync_result["end_time"] = datetime.now().isoformat()
            
        except Exception as e:
            sync_result["overall_status"] = "failed"
            sync_result["error"] = str(e)
            sync_result["end_time"] = datetime.now().isoformat()
        
        return sync_result
    
    async def sync_apple_notes(self) -> Dict[str, Any]:
        """Sync Apple Notes to knowledge graph"""
        
        # Export Apple Notes
        notes_data = await self.apple_notes_exporter.export_notes()
        
        # Sync to knowledge graph
        sync_result = await self.knowledge_graph.sync_apple_notes(notes_data)
        
        return sync_result
    
    async def sync_obsidian(self) -> Dict[str, Any]:
        """Sync Obsidian vault to knowledge graph"""
        
        # Sync Obsidian vault
        vault_result = await self.obsidian_sync.sync_vault()
        
        # Process vault data for knowledge graph
        graph_result = await self.knowledge_graph.sync_obsidian_vault(vault_result)
        
        return {
            "vault_sync": vault_result,
            "graph_sync": graph_result
        }
    
    async def sync_jupyter(self) -> Dict[str, Any]:
        """Sync Jupyter notebooks to knowledge graph"""
        
        # Process Jupyter notebooks
        notebooks_result = await self.jupyter_sync.process_notebooks()
        
        # Sync to knowledge graph
        graph_result = await self.knowledge_graph.sync_jupyter_notebooks(notebooks_result)
        
        return {
            "notebooks_sync": notebooks_result,
            "graph_sync": graph_result
        }
    
    async def sync_github(self) -> Dict[str, Any]:
        """Sync GitHub repositories to knowledge graph"""
        
        # This would typically sync GitHub repos
        # For now, return mock result
        
        return {
            "repos_synced": 5,
            "commits_processed": 150,
            "files_analyzed": 200,
            "status": "completed"
        }
    
    async def setup_automated_sync(self) -> Dict[str, Any]:
        """Setup automated synchronization"""
        
        automation_config = {
            "apple_notes": {
                "frequency": "daily",
                "time": "06:00",
                "enabled": True
            },
            "obsidian": {
                "frequency": "real_time",
                "enabled": True
            },
            "jupyter": {
                "frequency": "on_save",
                "enabled": True
            },
            "github": {
                "frequency": "hourly",
                "enabled": True
            }
        }
        
        # Setup cron jobs or file watchers
        await self._setup_cron_jobs(automation_config)
        
        return {
            "automation_config": automation_config,
            "status": "configured",
            "timestamp": datetime.now().isoformat()
        }
    
    async def _setup_cron_jobs(self, config: Dict[str, Any]):
        """Setup cron jobs for automated sync"""
        
        # This would typically setup actual cron jobs
        # For now, just log the configuration
        
        print(f"Setting up automated sync with config: {config}")
```

## Success Metrics

- **Sync Success Rate**: >99% successful synchronization
- **Query Response Time**: <2 seconds for complex queries
- **Entity Extraction Accuracy**: >95% accurate entity extraction
- **Relationship Detection**: >90% accurate relationship detection
- **Context Relevance**: >85% relevant context for AI agents
- **Cross-Platform Consistency**: 100% data consistency across platforms
